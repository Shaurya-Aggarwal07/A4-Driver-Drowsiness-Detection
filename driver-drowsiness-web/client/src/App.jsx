import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DrowsinessProvider } from './context/DrowsinessContext';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';

function App() {
  return (
    <DrowsinessProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
        <footer className="bg-gray-100 py-6">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} Driver Drowsiness Detection System</p>
          </div>
        </footer>
      </div>
    </DrowsinessProvider>
  );
}

export default App; 