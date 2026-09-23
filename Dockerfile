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

# System deps for ultralytics/opencv + wget for model download
# libgl1-mesa-glx renamed to libgl1 in Debian trixie
RUN apt-get update && apt-get install -y --no-install-recommends \
    libglib2.0-0 libsm6 libxext6 libxrender-dev libgl1 wget \
    && rm -rf /var/lib/apt/lists/*

# Python deps
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Download models at build time
# TACO YOLOv11s from Hugging Face
RUN wget -q --show-progress -O yolo11s-taco.pt \
    "https://huggingface.co/fabiocigaina/TACO-yolo11s/resolve/main/best_model.pt"
# COCO YOLOv11n from Ultralytics assets
RUN wget -q --show-progress -O yolo11n.pt \
    "https://github.com/ultralytics/assets/releases/download/v8.2.0/yolov11n.pt"

# Backend code
COPY backend/main.py ./backend/

# Built frontend
COPY --from=frontend-build /app/dist ./dist

ENV PYTHONUNBUFFERED=1 \
    CONF_TACO=0.20 \
    CONF_COCO=0.25 \
    NMS_IOU=0.45

EXPOSE 8000
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]