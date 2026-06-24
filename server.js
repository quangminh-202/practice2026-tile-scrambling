const express = require('express');
const path = require('path');
const { PORT } = require('./config/constants');
const tilesRouter = require('./routes/tiles');

const app = express();

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Mount tiles routes
app.use('/tiles', tilesRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Tile scrambling server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});