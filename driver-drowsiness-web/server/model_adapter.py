import cv2
import dlib
import numpy as np
from scipy.spatial import distance
from imutils import face_utils
import socketio
import time
import sys
import json
import os
import base64

# Initialize Socket.IO client
sio = socketio.Client()

# Connect to the Express server
@sio.event
def connect():
    print("Connected to server")

@sio.event
def connect_error(data):
    print(f"Connection error: {data}")

@sio.event
def disconnect():
    print("Disconnected from server")

# Load face detector and landmark predictor
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor("../../models/shape_predictor_68_face_landmarks.dat")

# Constants for eye indices
(lStart, lEnd) = face_utils.FACIAL_LANDMARKS_IDXS["left_eye"]
(rStart, rEnd) = face_utils.FACIAL_LANDMARKS_IDXS["right_eye"]

# Function to calculate eye aspect ratio (EAR)
def eye_aspect_ratio(eye):
    A = distance.euclidean(eye[1], eye[5])
    B = distance.euclidean(eye[2], eye[4])
    C = distance.euclidean(eye[0], eye[3])
    ear = (A + B) / (2.0 * C)
    return ear

# Main function to detect drowsiness
def detect_drowsiness():
    # Initialize camera
    cap = cv2.VideoCapture(0)
    
    if not cap.isOpened():
        print("Error: Could not open camera.")
        return
    
    # Set camera properties
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
    
    alert_count = 0
    EAR_THRESHOLD = 0.25
    
    try:
        while True:
            ret, frame = cap.read()
            if not ret:
                print("Error: Failed to capture frame.")
                break
                
            # Convert to grayscale
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            
            # Detect faces
            faces = detector(gray, 0)
            
            ear_value = 0
            is_drowsy = False
            
            for face in faces:
                # Detect facial landmarks
                shape = predictor(gray, face)
                shape = face_utils.shape_to_np(shape)
                
                # Extract eye coordinates
                leftEye = shape[lStart:lEnd]
                rightEye = shape[rStart:rEnd]
                
                # Calculate EAR
                leftEAR = eye_aspect_ratio(leftEye)
                rightEAR = eye_aspect_ratio(rightEye)
                
                # Average EAR
                ear_value = (leftEAR + rightEAR) / 2.0
                
                # Draw eyes on the frame
                leftEyeHull = cv2.convexHull(leftEye)
                rightEyeHull = cv2.convexHull(rightEye)
                cv2.drawContours(frame, [leftEyeHull], -1, (0, 255, 255), 1)
                cv2.drawContours(frame, [rightEyeHull], -1, (0, 255, 255), 1)
                
                # Detect drowsiness
                if ear_value < EAR_THRESHOLD:
                    alert_count += 1
                    if alert_count >= 10:  # ~0.5 seconds if running at ~20 FPS
                        is_drowsy = True
                        cv2.putText(frame, "DROWSINESS DETECTED!", (10, 30),
                                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
                else:
                    alert_count = 0
                    is_drowsy = False
                
                # Draw EAR value on frame
                cv2.putText(frame, f"EAR: {ear_value:.2f}", (10, 60),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
            
            # Convert frame to base64 for web transmission
            _, buffer = cv2.imencode('.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 80])
            img_base64 = base64.b64encode(buffer).decode('utf-8')
            
            # Send data to server
            sio.emit('drowsiness', {
                'isDrowsy': is_drowsy,
                'score': float(ear_value),
                'frame': f'data:image/jpeg;base64,{img_base64}'
            })
            
            # Limit the frame rate
            time.sleep(0.05)  # ~20 FPS
    
    except KeyboardInterrupt:
        print("Stopping detection...")
    finally:
        cap.release()
        sio.disconnect()

if __name__ == "__main__":
    # Connect to server
    try:
        server_url = "http://localhost:5000"
        print(f"Connecting to server at {server_url}...")
        sio.connect(server_url)
        detect_drowsiness()
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1) 