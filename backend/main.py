import os
import urllib.request
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path
from uuid import uuid4

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from ultralytics import YOLO

ROOT = Path(__file__).resolve().parents[1]

WASTE_MODEL_PATH = ROOT / "yolo11s-taco.pt"
COCO_MODEL_PATH = ROOT / "yolo11n.pt"

TACO_MODEL_URL = "https://huggingface.co/fabiocigaina/TACO-yolo11s/resolve/main/best_model.pt"
COCO_MODEL_URL = "https://github.com/ultralytics/assets/releases/download/v8.3.0/yolo11n.pt"


def safe_float_env(key: str, default: float) -> float:
    val = os.getenv(key)
    if val:
        try:
            return float(val)
        except ValueError:
            pass
    return default


CONF_TACO = safe_float_env("CONF_TACO", 0.20)
CONF_COCO = safe_float_env("CONF_COCO", 0.25)
NMS_IOU = safe_float_env("NMS_IOU", 0.45)

_waste_model = None
_coco_model = None


def ensure_model_file(model_path: Path, url: str):
    if not model_path.exists() or model_path.stat().st_size == 0:
        print(f"Downloading model {model_path.name} from {url}...")
        urllib.request.urlretrieve(url, str(model_path))
        print(f"Model {model_path.name} downloaded successfully.")


def get_waste_model():
    global _waste_model
    if _waste_model is None:
        ensure_model_file(WASTE_MODEL_PATH, TACO_MODEL_URL)
        _waste_model = YOLO(str(WASTE_MODEL_PATH))
    return _waste_model


def get_coco_model():
    global _coco_model
    if _coco_model is None:
        ensure_model_file(COCO_MODEL_PATH, COCO_MODEL_URL)
        _coco_model = YOLO(str(COCO_MODEL_PATH))
    return _coco_model


app = FastAPI(title="WasteVision local inference API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TACO_WASTE_MAPPING = {
    "Plastic bag & wrapper": ("Plastic Bag / Wrapper", "plastic", ["LDPE", "HDPE", "PP film"], "low"),
    "Cigarette": ("Cigarette Butt", "hazardous", ["cellulose acetate", "tobacco residue"], "high"),
    # TACO's generic Bottle class does not distinguish plastic from glass.
    # Keep the output honest instead of assigning an unsupported material.
    "Bottle": ("Bottle — Needs Verification", "mixed", ["unknown bottle material"], "low"),
    "Bottle cap": ("Bottle Cap", "plastic", ["PP", "HDPE", "metal"], "low"),
    "Can": ("Metal Can", "metal", ["aluminium", "steel", "tin"], "low"),
    "Other plastic": ("Plastic Item", "plastic", ["mixed plastics"], "medium"),
    "Carton": ("Carton / Cardboard", "paper", ["paperboard", "cardboard"], "low"),
    "Cup": ("Disposable Cup", "plastic", ["paper", "plastic lining", "PS"], "low"),
}

COCO_WASTE_MAPPING = {
    "bottle": ("Plastic Bottle", "plastic", ["PET plastic"], "low"),
    "wine glass": ("Glass Container", "glass", ["glass"], "low"),
    "cup": ("Cup", "plastic", ["paper", "plastic"], "low"),
    "cell phone": ("Mobile Phone", "e-waste", ["electronics", "metal", "glass"], "high"),
    "laptop": ("Laptop", "e-waste", ["electronics", "metal", "plastic"], "high"),
    "keyboard": ("Keyboard", "e-waste", ["electronics", "plastic"], "medium"),
    "mouse": ("Computer Mouse", "e-waste", ["electronics", "plastic"], "medium"),
    "tv": ("Electronic Display", "e-waste", ["electronics", "glass", "plastic"], "high"),
    "remote": ("Remote Control", "e-waste", ["electronics", "plastic"], "medium"),
    "book": ("Paper / Book", "paper", ["paper"], "low"),
    "banana": ("Banana", "organic", ["organic matter"], "low"),
    "apple": ("Apple", "organic", ["organic matter"], "low"),
    "orange": ("Orange", "organic", ["organic matter"], "low"),
    "broccoli": ("Broccoli", "organic", ["organic matter"], "low"),
    "carrot": ("Carrot", "organic", ["organic matter"], "low"),
    "sandwich": ("Food Waste", "organic", ["organic matter"], "low"),
    "pizza": ("Food Waste", "organic", ["organic matter"], "low"),
    "donut": ("Food Waste", "organic", ["organic matter"], "low"),
    "cake": ("Food Waste", "organic", ["organic matter"], "low"),
}


def run_inference(model, image_path, conf=0.25):
    return model.predict(str(image_path), conf=conf, verbose=False)[0]


def nms_detections(detections, iou_threshold=0.45):
    if not detections:
        return []
    detections = sorted(detections, key=lambda d: d["confidence"], reverse=True)
    keep = []
    while detections:
        best = detections.pop(0)
        keep.append(best)
        detections = [
            d for d in detections
            if calculate_iou(best["bbox"], d["bbox"]) < iou_threshold
        ]
    return keep


def calculate_iou(box1, box2):
    x1 = max(box1["x"], box2["x"])
    y1 = max(box1["y"], box2["y"])
    x2 = min(box1["x"] + box1["width"], box2["x"] + box2["width"])
    y2 = min(box1["y"] + box1["height"], box2["y"] + box2["height"])
    if x2 <= x1 or y2 <= y1:
        return 0.0
    intersection = (x2 - x1) * (y2 - y1)
    area1 = box1["width"] * box1["height"]
    area2 = box2["width"] * box2["height"]
    union = area1 + area2 - intersection
    return intersection / union if union > 0 else 0.0


def process_predictions(prediction, mapping, model_name, image_width, image_height, conf_threshold=0.25):
    detections = []
    for index, box in enumerate(prediction.boxes):
        cls_id = int(box.cls[0])
        model_cls_name = prediction.names[cls_id]
        mapped = mapping.get(model_cls_name)
        if not mapped:
            continue
        confidence = float(box.conf[0])
        if confidence < conf_threshold:
            continue
        object_name, category, material, risk = mapped
        x1, y1, x2, y2 = [float(value) for value in box.xyxy[0].tolist()]
        detections.append({
            "id": f"det_{model_name}_{index}",
            "object": object_name,
            "category": category,
            "confidence": round(confidence, 3),
            "material": material,
            "risk": risk,
            "bbox": {
                "x": round((x1 / image_width) * 100, 2),
                "y": round((y1 / image_height) * 100, 2),
                "width": round(((x2 - x1) / image_width) * 100, 2),
                "height": round(((y2 - y1) / image_height) * 100, 2),
            },
            "source_model": model_name,
            "original_class": model_cls_name,
        })
    return detections


def build_composition(detections):
    grouped = defaultdict(list)
    for detection in detections:
        grouped[detection["category"]].append(detection)
    total = len(detections)
    if total == 0:
        return []
    return [
        {
            "category": category,
            "percentage": round((len(items) / total) * 100, 1),
            "object_count": len(items),
            "confidence": round(sum(item["confidence"] for item in items) / len(items), 3),
        }
        for category, items in grouped.items()
    ]


@app.get("/health")
@app.get("/api/health")
def health():
    return {
        "status": "ready",
        "models": {
            "waste": "YOLOv11s-TACO (fabiocigaina/TACO-yolo11s)",
            "coco": "YOLOv11n-COCO",
        },
        "waste_classes": list(TACO_WASTE_MAPPING.keys()),
        "coco_classes": list(COCO_WASTE_MAPPING.keys()),
    }


@app.post("/api/analyze-waste")
async def analyze_waste(image: UploadFile = File(...)):
    if not image.content_type or not image.content_type.startswith("image/"):
        raise HTTPException(400, "Please upload an image file.")

    upload_dir = ROOT / ".runtime-uploads"
    upload_dir.mkdir(exist_ok=True)
    suffix = Path(image.filename or "upload.jpg").suffix or ".jpg"
    image_path = upload_dir / f"{uuid4()}{suffix}"
    image_path.write_bytes(await image.read())

    try:
        waste_model = get_waste_model()
        coco_model = get_coco_model()

        waste_pred = run_inference(waste_model, image_path, conf=CONF_TACO)
        coco_pred = run_inference(coco_model, image_path, conf=CONF_COCO)

        h, w = waste_pred.orig_shape

        waste_dets = process_predictions(waste_pred, TACO_WASTE_MAPPING, "taco", w, h, conf_threshold=CONF_TACO)
        coco_dets = process_predictions(coco_pred, COCO_WASTE_MAPPING, "coco", w, h, conf_threshold=CONF_COCO)

        all_detections = waste_dets + coco_dets

        all_detections = nms_detections(all_detections, iou_threshold=NMS_IOU)

        for i, det in enumerate(all_detections):
            det["id"] = f"det_{i}"

        return {
            "image_id": f"scan_{uuid4().hex[:10]}",
            "detections": all_detections,
            "composition": build_composition(all_detections),
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "model_info": {
                "primary": "YOLOv11s-TACO",
                "fallback": "YOLOv11n-COCO",
                "note": "Detections from TACO model prioritized; COCO used for e-waste/food categories not in TACO.",
            },
        }
    finally:
        image_path.unlink(missing_ok=True)


@app.post("/api/rag/query")
async def rag_query(payload: dict):
    return {
        "query": payload.get("query", ""),
        "context": "Local safety and segregation guidance based on detected waste categories. Verify local municipal requirements before disposal.",
        "sources": [{"title": "Local inference guidance", "category": "local", "relevance": 0.7}],
    }


@app.post("/api/granite/recommend")
async def recommend(payload: dict):
    categories = {item.get("category") for item in payload.get("detections", [])}
    category_text = ", ".join(sorted(c for c in categories if c)) or "unverified items"
    high_risk = any(item.get("risk") in ("high", "critical") for item in payload.get("detections", []))
    safety_note = (
        "High-risk items detected (batteries, biomedical, chemicals). Handle with extreme care and use authorized facilities."
        if high_risk
        else "Items not recognized by the model need manual verification before handling."
    )
    return {
        "recommendation": {
            "summary": f"Detected waste categories: {category_text}.",
            "why_it_matters": "Separate materials to reduce contamination and improve recovery.",
            "segregation": "Keep each detected category separate and clean where safe to do so.",
            "disposal": "Use your local disposal guide or an authorized collection facility.",
            "safety": safety_note,
            "recovery": "Recycle accepted paper, glass, plastic, metal, and e-waste through suitable channels.",
            "grounded_in": ["Local inference output", "Local safety guidance"],
        },
        "grounded_in": ["Local inference output", "Local safety guidance"],
    }


dist_dir = ROOT / "dist"
if dist_dir.exists():
    assets_dir = dist_dir / "assets"
    if assets_dir.exists():
        app.mount("/assets", StaticFiles(directory=str(assets_dir)), name="assets")

    @app.get("/")
    async def serve_index():
        index_file = dist_dir / "index.html"
        if index_file.is_file():
            return FileResponse(str(index_file))
        return {"status": "ok", "message": "WasteVision backend API is running"}

    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        if full_path.startswith("api/") or full_path == "api":
            raise HTTPException(404, "API endpoint not found")
        target = dist_dir / full_path
        if target.is_file():
            return FileResponse(str(target))
        index_file = dist_dir / "index.html"
        if index_file.is_file():
            return FileResponse(str(index_file))
        raise HTTPException(404, "Frontend file not found")
else:
    @app.get("/")
    def root():
        return {"status": "ok", "message": "WasteVision backend API is running"}


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("backend.main:app", host="0.0.0.0", port=port)
