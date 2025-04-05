import React, { createContext, useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';

// Create context
export const DrowsinessContext = createContext();

// Socket.io connection
const SOCKET_URL = 'http://localhost:5000';

export const DrowsinessProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [currentFrame, setCurrentFrame] = useState('');
  const [isDrowsy, setIsDrowsy] = useState(false);
  const [earScore, setEarScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [alertCount, setAlertCount] = useState(0);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    
    newSocket.on('connect', () => {
      console.log('Connected to server');
      setConnected(true);
    });
    
    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setConnected(false);
    });
    
    setSocket(newSocket);
    
    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);
  
  // Handle incoming data
  useEffect(() => {
    if (!socket) return;
    
    // Listen for drowsiness updates
    socket.on('drowsiness_update', (data) => {
      setIsDrowsy(data.isDrowsy);
      setEarScore(data.score);
      
      // Increment alert count if drowsy
      if (data.isDrowsy) {
        setAlertCount(prev => prev + 1);
      }
    });
    
    // Listen for video frame updates
    socket.on('frame', (frameData) => {
      setCurrentFrame(frameData);
    });
    
    // Listen for history updates
    socket.on('history', (historyData) => {
      setHistory(historyData);
    });
    
    return () => {
      socket.off('drowsiness_update');
      socket.off('frame');
      socket.off('history');
    };
  }, [socket]);

  // Reset alert count
  const resetAlertCount = useCallback(() => {
    setAlertCount(0);
  }, []);

  return (
    <DrowsinessContext.Provider
      value={{
        connected,
        currentFrame,
        isDrowsy,
        earScore,
        history,
        alertCount,
        resetAlertCount
      }}
    >
      {children}
    </DrowsinessContext.Provider>
  );
}; 