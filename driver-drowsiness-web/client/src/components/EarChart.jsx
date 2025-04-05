import React, { useContext, useEffect, useState } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  TimeScale,
  Filler 
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import { DrowsinessContext } from '../context/DrowsinessContext';

// Register ChartJS components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  TimeScale,
  Filler
);

const EarChart = () => {
  const { history } = useContext(DrowsinessContext);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  // Update chart data when history changes
  useEffect(() => {
    if (history.length === 0) return;

    // Prepare data points
    const labels = history.slice(-30).map(item => format(new Date(item.timestamp), 'HH:mm:ss'));
    const earScores = history.slice(-30).map(item => item.score);
    const drowsyPoints = history.slice(-30).map(item => item.isDrowsy ? item.score : null);

    setChartData({
      labels,
      datasets: [
        {
          label: 'EAR Score',
          data: earScores,
          borderColor: 'rgb(0, 122, 255)',
          backgroundColor: 'rgba(0, 122, 255, 0.1)',
          tension: 0.3,
          fill: true
        },
        {
          label: 'Drowsy Moments',
          data: drowsyPoints,
          borderColor: 'rgb(255, 59, 48)',
          backgroundColor: 'rgba(255, 59, 48, 0.6)',
          pointRadius: 6,
          pointHoverRadius: 8,
          showLine: false
        }
      ]
    });
  }, [history]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      y: {
        min: 0,
        max: 0.5,
        title: {
          display: true,
          text: 'EAR Score'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time'
        }
      }
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 1,
        hoverRadius: 4
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">EAR Score Monitoring</h2>
      
      <div className="bg-white rounded-lg p-4" style={{ height: '300px' }}>
        {history.length > 0 ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Waiting for EAR data...</p>
          </div>
        )}
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-gray-100 p-3 rounded-lg">
          <div className="text-xs uppercase font-semibold text-gray-500 mb-1">Alert Threshold</div>
          <div className="flex items-center">
            <div className="h-3 w-3 bg-safe-green rounded-full mr-2"></div>
            <span>EAR &gt; 0.25</span>
          </div>
        </div>
        
        <div className="bg-gray-100 p-3 rounded-lg">
          <div className="text-xs uppercase font-semibold text-gray-500 mb-1">Drowsy Threshold</div>
          <div className="flex items-center">
            <div className="h-3 w-3 bg-alert-red rounded-full mr-2"></div>
            <span>EAR &lt; 0.25</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarChart; 