# syntax=docker/dockerfile:1.7
# Multi-stage: build frontend -> copy into Python runtime with models
FROM node:20-alpine AS frontend-build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM python:3.11-slim AS runtime
WORKDIR /app

# System deps for ultralytics/opencv/torch + wget/curl
RUN apt-get update && apt-get install -y --no-install-recommends \
    libglib2.0-0 libsm6 libxext6 libxrender1 libgl1 libgomp1 wget curl \
    && rm -rf /var/lib/apt/lists/*

# Python deps: install CPU-only PyTorch first to reduce image size and build time
COPY backend/requirements.txt .
RUN pip install --no-cache-dir torch torchvision --index-url https://download.pytorch.org/whl/cpu \
    && pip install --no-cache-dir -r requirements.txt

# Download models at build time with retry
# TACO YOLOv11s from Hugging Face
RUN wget -q --show-progress -t 3 -O yolo11s-taco.pt \
    "https://huggingface.co/fabiocigaina/TACO-yolo11s/resolve/main/best_model.pt"
# COCO YOLOv11n from Ultralytics assets
RUN wget -q --show-progress -t 3 -O yolo11n.pt \
    "https://github.com/ultralytics/assets/releases/download/v8.3.0/yolo11n.pt"

# Backend code
COPY backend/ ./backend/

# Built frontend
COPY --from=frontend-build /app/dist ./dist

ENV PYTHONUNBUFFERED=1 \
    CONF_TACO=0.20 \
    CONF_COCO=0.25 \
    NMS_IOU=0.45 \
    PORT=8000

EXPOSE 8000
CMD ["python", "-m", "backend.main"]