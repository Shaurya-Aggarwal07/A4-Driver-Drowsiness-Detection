import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DrowsinessProvider } from './context/DrowsinessContext';
import { ThemeProvider } from './context/ThemeContext';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <DrowsinessProvider>
        <div className="min-h-screen flex flex-col dark:bg-background-dark bg-background-light">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </DrowsinessProvider>
    </ThemeProvider>
  );
}

export default App; 