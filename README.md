# Driver Drowsiness Detection System

A real-time web-based application for detecting driver drowsiness using computer vision and machine learning techniques.


## Overview

This system uses Eye Aspect Ratio (EAR) algorithm to monitor a driver's eyes and detect signs of drowsiness in real-time. When the driver's eyes remain closed for a prolonged period, the system identifies this as drowsiness and triggers alerts to prevent potential accidents.

## Features

- **Real-time monitoring**: Live video feed with facial landmark detection
- **Drowsiness alerts**: Visual and audible alerts when drowsiness is detected
- **EAR score visualization**: Graphs showing Eye Aspect Ratio over time
- **Historical data**: Log of drowsiness events for analysis
- **Responsive design**: Works on various screen sizes
- **Statistics dashboard**: Overview of detection metrics

## Technology Stack

### Frontend
- React.js
- Tailwind CSS v3
- Chart.js for data visualization
- Socket.io client for real-time communication

### Backend
- Express.js for the web server
- Socket.io for bidirectional communication
- Node.js for server-side JavaScript

### Machine Learning
- Python for the ML implementation
- OpenCV for computer vision tasks
- dlib for facial landmark detection
- SciPy for mathematical calculations


## Prerequisites

- Node.js and npm (v14 or higher)
- Python 3.6+ with pip
- Webcam access
- Modern web browser (Chrome, Firefox, Edge)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Shaurya-Aggarwal07/sleep-detection.git
cd sleep-detection
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd driver-drowsiness-web/server

# Install Node.js dependencies
npm install

# Install Python dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup

```bash
# Navigate to client directory
cd driver-drowsiness-web/client

# Install dependencies
npm install
```

### 4. Model Setup

Download the facial landmark predictor model:

```bash
# Create models directory if it doesn't exist
mkdir -p driver-drowsiness-web/models

# Download the model
cd driver-drowsiness-web/models
curl -L "https://github.com/italojs/facial-landmarks-recognition/raw/master/shape_predictor_68_face_landmarks.dat" -o shape_predictor_68_face_landmarks.dat
```

## Running the Application

1. **Start the Express Server**:
   ```bash
   cd driver-drowsiness-web/server
   npm start
   ```
   The server will run on port 5000.

2. **Start the ML Model Adapter**:
   ```bash
   cd driver-drowsiness-web/server
   python model_adapter.py
   ```

3. **Start the React Frontend**:
   ```bash
   cd driver-drowsiness-web/client
   npm start
   ```
   The application will open in your browser at `http://localhost:3000`.

## How It Works

1. The system accesses the webcam feed to capture the driver's face.
2. Facial landmarks are detected and the Eye Aspect Ratio (EAR) is calculated.
3. The EAR is monitored over time:
   - High EAR values indicate open eyes (alert state)
   - Low EAR values indicate closed eyes (potential drowsiness)
4. When the EAR remains below the threshold for a certain period, the system identifies this as drowsiness and triggers alerts.
5. All data is transmitted in real-time to the web interface via Socket.io.

## Future Enhancements

- Integration with mobile apps for broader accessibility
- Multi-person drowsiness detection for transport vehicles
- Cloud-based analytics for long-term pattern analysis
- Integration with vehicle systems for automatic safety measures
