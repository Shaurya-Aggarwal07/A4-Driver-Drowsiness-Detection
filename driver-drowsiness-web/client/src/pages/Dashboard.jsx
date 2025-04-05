import React, { useContext } from 'react';
import { DrowsinessContext } from '../context/DrowsinessContext';
import AlertStatus from '../components/AlertStatus';
import VideoFeed from '../components/VideoFeed';
import EarChart from '../components/EarChart';
import DetectionHistory from '../components/DetectionHistory';
import Stats from '../components/Stats';

const Dashboard = () => {
  const { connected } = useContext(DrowsinessContext);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold mb-4 text-text-light dark:text-text-dark">Driver Drowsiness Monitoring</h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
            This system uses Eye Aspect Ratio (EAR) to detect driver drowsiness in real-time.
            When a driver's eyes stay closed for too long, the system triggers alerts to prevent accidents.
          </p>
          
          {connected ? (
            <AlertStatus />
          ) : (
            <div className="card bg-gray-100 dark:bg-gray-800 p-6 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">Not Connected</h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark">
                Please start the model adapter to begin monitoring.
              </p>
            </div>
          )}
          
          <div className="mt-6">
            <Stats />
          </div>
        </div>
        
        <div className="md:w-1/2">
          <VideoFeed />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EarChart />
        <DetectionHistory />
      </div>
      
      <div className="card bg-card-light dark:bg-card-dark p-6">
        <h2 className="text-xl font-semibold mb-4 text-text-light dark:text-text-dark">About the System</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-text-light dark:text-text-dark">
            This driver drowsiness detection system uses computer vision to monitor the driver's eyes in real-time.
            It calculates the Eye Aspect Ratio (EAR) from facial landmarks to determine if the driver's eyes are closing.
          </p>
          
          <h3 className="text-lg font-medium mt-4 text-text-light dark:text-text-dark">How It Works</h3>
          <ol className="list-decimal list-inside space-y-2 text-text-light dark:text-text-dark">
            <li>The system captures video from the camera feed</li>
            <li>Facial landmarks are detected to locate the driver's eyes</li>
            <li>The Eye Aspect Ratio (EAR) is calculated based on these landmarks</li>
            <li>When EAR falls below 0.25 for a sustained period, drowsiness is detected</li>
            <li>Alerts are triggered to warn the driver</li>
          </ol>
          
          <p className="mt-4 text-text-light dark:text-text-dark">
            This interface provides real-time monitoring and historical data to help prevent accidents 
            caused by driver fatigue.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
