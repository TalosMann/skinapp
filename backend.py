from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastai.vision.all import load_learner, PILImage
import io

app = FastAPI()

# Allow CORS (your React Native app will access this)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev, allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your model once at startup
model_path = "resnet152_model.pkl"
learner = load_learner(model_path)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
# 🔍 Debug: print size of uploaded file
    print(f"Received file size: {len(contents)} bytes")
    
    # Create image from bytes
    img = PILImage.create(io.BytesIO(contents))
    
    # 🔍 Debug: print image size and mode
    print(f"Image size: {img.size}, mode: {img.mode}")
    
    # Predict using the model
    pred, pred_idx, probs = learner.predict(img)
    
    # 🔍 Debug: print prediction and confidence
    print(f"Prediction: {pred}, Confidence: {probs[pred_idx].item() * 100:.2f}%")
    
    # Return JSON with predictions
    return {
        "predictions": [
            {"label": str(pred), "confidence": float(probs[pred_idx] * 100)}
        ]
    }
