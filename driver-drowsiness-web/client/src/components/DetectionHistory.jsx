import React, { useContext } from 'react';
import { format } from 'date-fns';
import { DrowsinessContext } from '../context/DrowsinessContext';

const DetectionHistory = () => {
  const { history } = useContext(DrowsinessContext);
  
  // Filter to only show drowsy events
  const drowsyEvents = history.filter(event => event.isDrowsy);

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Drowsiness Detection History</h2>
      
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        {drowsyEvents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    EAR Score
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {drowsyEvents.slice(-10).reverse().map((event, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(event.timestamp), 'HH:mm:ss')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.score.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-alert-red text-white">
                        Drowsy
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">
            <p>No drowsiness events detected yet.</p>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Showing the 10 most recent drowsiness events. Each event represents a period when the driver was detected as drowsy.</p>
      </div>
    </div>
  );
};

export default DetectionHistory; 