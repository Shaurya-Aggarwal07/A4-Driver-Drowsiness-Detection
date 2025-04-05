import React, { useContext } from 'react';
import { DrowsinessContext } from '../context/DrowsinessContext';

const AlertStatus = () => {
  const { isDrowsy, earScore } = useContext(DrowsinessContext);

  return (
    <div className={`card ${isDrowsy ? 'drowsy-alert' : 'safe-alert'} transition-all duration-500`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Status: {isDrowsy ? 'DROWSY' : 'ALERT'}</h2>
          <p className="text-lg mt-1">
            EAR Score: <span className="font-semibold">{earScore.toFixed(2)}</span>
          </p>
        </div>
        
        <div className="rounded-full bg-white/20 dark:bg-black/20 p-4">
          {isDrowsy ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>
      </div>
      
      {isDrowsy && (
        <div className="mt-4 bg-white/20 dark:bg-black/20 rounded-lg p-3">
          <p className="font-bold text-center">WAKE UP! Driver drowsiness detected!</p>
        </div>
      )}
    </div>
  );
};

export default AlertStatus; 