import React, { useContext, useMemo } from 'react';
import { DrowsinessContext } from '../context/DrowsinessContext';

const Stats = () => {
  const { history, alertCount } = useContext(DrowsinessContext);
  
  // Calculate statistics
  const stats = useMemo(() => {
    if (history.length === 0) {
      return {
        drowsyCount: 0,
        alertCount: 0,
        drowsyPercentage: 0,
        avgEarScore: 0
      };
    }
    
    const drowsyEvents = history.filter(event => event.isDrowsy);
    const drowsyCount = drowsyEvents.length;
    const avgEarScore = history.reduce((sum, event) => sum + event.score, 0) / history.length;
    const drowsyPercentage = (drowsyCount / history.length) * 100;
    
    return {
      drowsyCount,
      alertCount,
      drowsyPercentage: Math.round(drowsyPercentage),
      avgEarScore: avgEarScore.toFixed(2)
    };
  }, [history, alertCount]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <div className="card bg-white">
        <div className="text-xs uppercase font-semibold text-gray-500 mb-2">Detection Count</div>
        <div className="text-2xl font-bold">{history.length}</div>
        <div className="text-sm text-gray-500 mt-1">Total data points</div>
      </div>
      
      <div className="card bg-white">
        <div className="text-xs uppercase font-semibold text-gray-500 mb-2">Drowsy Events</div>
        <div className="text-2xl font-bold text-alert-red">{stats.drowsyCount}</div>
        <div className="text-sm text-gray-500 mt-1">Times drowsiness detected</div>
      </div>
      
      <div className="card bg-white">
        <div className="text-xs uppercase font-semibold text-gray-500 mb-2">Average EAR</div>
        <div className="text-2xl font-bold">{stats.avgEarScore}</div>
        <div className="text-sm text-gray-500 mt-1">Eye aspect ratio</div>
      </div>
      
      <div className="card bg-white">
        <div className="text-xs uppercase font-semibold text-gray-500 mb-2">Alert Percentage</div>
        <div className="flex items-end gap-2">
          <div className="text-2xl font-bold text-safe-green">{100 - stats.drowsyPercentage}%</div>
          <div className="text-base text-alert-red">{stats.drowsyPercentage}%</div>
        </div>
        <div className="text-sm text-gray-500 mt-1">Alert vs drowsy ratio</div>
      </div>
    </div>
  );
};

export default Stats; 