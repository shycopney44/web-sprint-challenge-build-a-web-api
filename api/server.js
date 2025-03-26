const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

// Middleware
server.use(express.json()); // Enables JSON parsing in incoming requests

// Routers
const projectsRouter = require('./projects/projects-router'); // Projects router
const actionsRouter = require('./actions/actions-router'); // Actions router

server.use('/api/projects', projectsRouter); // Use projects router for related endpoints
server.use('/api/actions', actionsRouter); // Use actions router for related endpoints

// Root Endpoint
server.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Sprint Challenge API!' });
});

module.exports = server;
