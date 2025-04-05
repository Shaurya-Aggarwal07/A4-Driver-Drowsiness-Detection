const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const fs = require('fs');

// Create Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Store detection history
let drowsinessHistory = [];

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected');
  
  // Send current history when client connects
  socket.emit('history', drowsinessHistory);
  
  // Handle drowsiness detection
  socket.on('drowsiness', (data) => {
    const timestamp = new Date().toISOString();
    const historyItem = {
      timestamp,
      isDrowsy: data.isDrowsy,
      score: data.score || 0
    };
    
    // Add to history
    drowsinessHistory.push(historyItem);
    
    // Limit history size to avoid memory issues
    if (drowsinessHistory.length > 100) {
      drowsinessHistory = drowsinessHistory.slice(-100);
    }
    
    // Broadcast to all clients
    io.emit('drowsiness_update', historyItem);
    io.emit('history', drowsinessHistory);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 