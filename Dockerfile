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

# System deps for ultralytics/opencv
RUN apt-get update && apt-get install -y --no-install-recommends \
    libglib2.0-0 libsm6 libxext6 libxrender-dev libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

# Python deps
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Models
COPY yolo11s-taco.pt yolo11n.pt ./

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