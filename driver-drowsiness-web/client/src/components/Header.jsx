import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DrowsinessContext } from '../context/DrowsinessContext';

const Header = () => {
  const { connected } = useContext(DrowsinessContext);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            <h1 className="text-xl font-bold text-gray-800">Driver Drowsiness Detection</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className={`h-3 w-3 rounded-full mr-2 ${connected ? 'bg-safe-green' : 'bg-gray-400'}`}></div>
              <span className="text-sm font-medium">{connected ? 'Connected' : 'Disconnected'}</span>
            </div>
            
            <Link to="/" className="btn btn-primary">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 