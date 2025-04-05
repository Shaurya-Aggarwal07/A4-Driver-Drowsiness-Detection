import React, { useContext, useRef, useEffect } from 'react';
import { DrowsinessContext } from '../context/DrowsinessContext';

const VideoFeed = () => {
  const { currentFrame, connected, isDrowsy } = useContext(DrowsinessContext);
  const imgRef = useRef(null);

  // Debug the frame data
  useEffect(() => {
    if (currentFrame) {
      console.log("Frame received, length:", currentFrame.length);
    }
  }, [currentFrame]);

  return (
    <div className="card overflow-hidden">
      <h2 className="text-xl font-semibold mb-4">Live Camera Feed</h2>
      
      <div className="video-container relative">
        {connected ? (
          currentFrame ? (
            <img 
              className="video-feed w-full h-auto"
              src={currentFrame}
              alt="Driver monitoring"
            />
          ) : (
            <div className="flex items-center justify-center h-80 bg-gray-200 rounded-lg">
              <div className="text-center p-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-600">Waiting for camera feed...</p>
              </div>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center h-80 bg-gray-200 rounded-lg">
            <div className="text-center p-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-600">Waiting for camera connection...</p>
            </div>
          </div>
        )}
        
        {isDrowsy && (
          <div className="absolute inset-0 border-4 border-alert-red animate-pulse-fast rounded-lg"></div>
        )}
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>The system is analyzing eye movements in real-time to detect signs of drowsiness.</p>
      </div>
    </div>
  );
};

export default VideoFeed; 