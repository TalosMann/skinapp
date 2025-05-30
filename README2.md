
# SkinAIApp

A mobile app built with React Native and FastAPI backend that lets users upload or take photos of skin conditions and get AI-powered predictions. This app is intended for educational purposes and **should not replace professional medical advice**.

---

## Features

- Upload images from gallery or take a photo using the camera
- Submit images to backend for AI-powered skin condition predictions
- Display top 3 predictions with confidence percentages
- Simple and user-friendly interface
- Disclaimer about medical accuracy

---

## Getting Started

### Prerequisites

- Node.js & npm
- Python 3.8+
- Expo CLI (`npm install -g expo-cli`)
- Uvicorn (`pip install uvicorn`)
- Conda or virtualenv (recommended)
- Android Studio (optional, for emulator)

### Backend Setup

1. Create and activate Python virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/macOS
   .\venv\Scripts\activate   # Windows PowerShell
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Run the backend server:

   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup

1. Navigate to the frontend project directory

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start Expo development server (using tunnel for device access):

   ```bash
   npx expo start --tunnel
   ```

4. Open Expo Go on your phone or emulator and scan the QR code

---

## Usage

- Launch the app on your phone or emulator
- Tap **Take Photo** or **Upload Image**
- Choose or capture a photo of the skin area
- Tap **Submit** to get predictions
- View top 3 predictions with confidence percentages
- Remember, this app is not a substitute for medical diagnosis!

---

## Disclaimer

This app uses AI for educational purposes and may produce inaccurate results. Always consult a healthcare professional for medical advice or diagnosis.

---

## License

MIT License

---

## Contact

Developed by [Your Name]  
Email: your.email@example.com  
GitHub: https://github.com/yourusername/skinaiapp

---
