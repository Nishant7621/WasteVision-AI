# WasteVision AI

**See Waste. Understand It. Segregate It.**

A real-time waste detection and segregation guidance system that uses computer vision to identify multiple waste objects in a single image and provides actionable disposal recommendations.

---

## Problem

Municipal waste segregation fails at the source because people cannot reliably identify what category each item belongs to. Existing solutions either:

- Use generic object detectors (YOLO/COCO) that miss most waste categories (batteries, biomedical, mixed plastics, cartons, etc.)
- Return mocked/demo detections instead of real model output
- Provide no actionable segregation or disposal guidance

---

## Solution

WasteVision AI runs a **dual-model inference pipeline** locally:

| Model | Purpose | Classes |
|-------|---------|---------|
| **YOLOv11s-TACO** (fabiocigaina/TACO-yolo11s) | Primary waste detector trained on the TACO litter dataset | Plastic bag & wrapper, Cigarette, Bottle, Bottle cap, Can, Other plastic, Carton, Cup, Other |
| **YOLOv11n-COCO** | Fallback for categories not in TACO (e-waste, food waste, glass) | bottle, wine glass, cup, cell phone, laptop, keyboard, mouse, tv, remote, book, banana, apple, orange, broccoli, carrot, sandwich, pizza, donut, cake |

**Pipeline:**
1. Upload image → both models run inference
2. Detections mapped to waste categories (plastic, metal, paper, glass, e-waste, organic, hazardous, mixed)
3. Non-maximum suppression merges overlapping boxes from both models
4. Composition calculated from actual detections
5. Segregation plan, disposal guidance, and safety warnings generated from real model output
6. Low-confidence results flagged as "Needs Verification"
7. High-risk classes (battery, biomedical, chemical, cigarette) only appear when detected with confidence

---

## Supported Waste Categories

| Category | TACO Classes | COCO Classes | Risk |
|----------|--------------|--------------|------|
| **plastic** | Plastic bag & wrapper, Bottle, Bottle cap, Other plastic, Cup | bottle, cup | low–medium |
| **metal** | Can | — | low |
| **paper** | Carton | book | low |
| **glass** | Bottle (when glass) | wine glass | low |
| **e-waste** | — | cell phone, laptop, keyboard, mouse, tv, remote | high |
| **organic** | — | banana, apple, orange, broccoli, carrot, sandwich, pizza, donut, cake | low |
| **hazardous** | Cigarette | — | high |
| **mixed** | Other | — | medium |

**Needs Verification / Not Yet Supported:**
- Battery (no trained class in either model)
- Biomedical / sharps / syringe
- Chemical containers
- Textile
- Sanitary waste
- Construction debris
- Rubber

---

## Architecture

```
┌─────────────┐     ┌──────────────────┐     ┌────────────────────┐
│  React UI   │────▶│  Vite Proxy      │────▶│  FastAPI Backend   │
│  (Port 5173)│     │  /api → :8000    │     │  (Uvicorn)         │
└─────────────┘     └──────────────────┘     └─────────┬──────────┘
                                                       │
                          ┌────────────────────────────┼────────────────────────────┐
                          ▼                            ▼                            ▼
                   ┌─────────────┐              ┌─────────────┐              ┌─────────────┐
                   │ YOLOv11s-   │              │ YOLOv11n-   │              │ NMS +       │
                   │ TACO        │              │ COCO        │              │ Mapping     │
                   │ (waste)     │              │ (general)   │              │             │
                   └─────────────┘              └─────────────┘              └─────────────┘
```

---

## Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- Windows / Linux / macOS

### 1. Backend (Terminal 1)

```bash
cd wastevision-ai

# Create venv (once)
python -m venv .visionenv
.\.visionenv\Scripts\activate      # Windows
# source .visionenv/bin/activate   # Linux/macOS

# Install deps
pip install -r backend/requirements.txt

# Run API
.\.visionenv\Scripts\python.exe -m uvicorn backend.main:app --host 127.0.0.1 --port 8000
```

API will be at `http://127.0.0.1:8000`  
Health check: `GET /api/health`

### 2. Frontend (Terminal 2)

```bash
cd wastevision-ai
npm install
npm run dev
```

App runs at `http://localhost:5173` (Vite proxies `/api` to backend).

---

## Usage

1. Open the Scanner page
2. Upload a photo of mixed waste (drag/drop or camera)
3. Wait for analysis (progress bar shows pipeline stages)
4. Review:
   - **Detection Viewer** – bounding boxes on image
   - **Detection Cards** – each object with category, confidence, material, risk
   - **Waste DNA / Composition** – category breakdown
   - **Segregation Plan** – bin mapping per category
   - **Granite Recommendation** – summary, why it matters, disposal, safety, recovery
   - **Quick Actions** – disposal guide, find centers, ask assistant, report error
5. Click "Scan Another" to reset

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Model info and supported classes |
| `POST` | `/api/analyze-waste` | Upload image → returns detections, composition, model_info |
| `POST` | `/api/rag/query` | Local safety/segregation guidance |
| `POST` | `/api/granite/recommend` | Structured recommendation from detections |

**Request (analyze-waste):**
```bash
curl -X POST -F "image=@mixed_waste.jpg" http://127.0.0.1:8000/api/analyze-waste
```

**Response:**
```json
{
  "image_id": "scan_a1b2c3d4e5",
  "detections": [
    {
      "id": "det_0",
      "object": "Plastic Bag / Wrapper",
      "category": "plastic",
      "confidence": 0.942,
      "material": ["LDPE", "HDPE", "PP film"],
      "risk": "low",
      "bbox": { "x": 13.6, "y": 39.0, "width": 5.1, "height": 13.8 },
      "source_model": "taco",
      "original_class": "Plastic bag & wrapper"
    }
  ],
  "composition": [
    { "category": "plastic", "percentage": 60.0, "object_count": 3, "confidence": 0.89 }
  ],
  "timestamp": "2026-09-21T12:34:56.789Z",
  "model_info": {
    "primary": "YOLOv11s-TACO",
    "fallback": "YOLOv11n-COCO",
    "note": "Detections from TACO model prioritized; COCO used for e-waste/food categories not in TACO."
  }
}
```

---

## Model Details

- **Primary:** `YOLOv11s-TACO` (fabiocigaina/TACO-yolo11s on Hugging Face) — 19 MB, 9 waste-specific classes
- **Fallback:** `YOLOv11n-COCO` (Ultralytics official) — 6 MB, 80 general classes (filtered to 18 waste-relevant)
- Both loaded once at server startup; inference runs on CPU (PyTorch 2.13 + CPU)

---

## Project Structure

```
wastevision-ai/
├── backend/
│   ├── main.py              # FastAPI app, dual-model pipeline, NMS, mappings
│   └── requirements.txt     # fastapi, uvicorn, python-multipart, ultralytics
├── src/
│   ├── components/scanner/  # DetectionViewer, DetectionCard, RiskAlert, etc.
│   ├── components/charts/   # WasteDNA, WasteComposition
│   ├── context/AppContext.tsx
│   ├── services/wasteApi.ts # Frontend API client
│   ├── pages/Scanner.jsx    # Main scanner workflow
│   └── types/index.ts       # TypeScript interfaces
├── yolo11s-taco.pt          # Downloaded TACO model (19 MB)
├── yolo11n.pt               # COCO model (6 MB)
├── vite.config.js           # Proxy /api → http://127.0.0.1:8000
└── package.json
```

---

## Development Notes

- **No mock data in production path** — `demoMode` is `false` in `AppContext.tsx`
- **No hardcoded detections** — every box comes from model inference
- **Confidence thresholds:** TACO 0.20, COCO 0.25 (tunable in `main.py`)
- **NMS IoU:** 0.45 across both model outputs
- **Bounding boxes** normalized to percentages for CSS overlay alignment
- **Empty results** return helpful message instead of crashing

---

## Build for Production

```bash
npm run build
# Output in /dist — serve with any static host or integrate with backend
```

---

## License

MIT — see LICENSE file.

---

## Acknowledgments

- [TACO Dataset](http://tacodataset.org/) — litter annotation benchmark
- [fabiocigaina/TACO-yolo11s](https://huggingface.co/fabiocigaina/TACO-yolo11s) — waste-trained YOLOv11s weights
- [Ultralytics](https://github.com/ultralytics/ultralytics) — YOLO framework