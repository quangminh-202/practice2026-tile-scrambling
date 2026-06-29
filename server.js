const express = require('express');
const path = require('path');
const { PORT } = require('./config/constants');
const tilesRouter = require('./routes/tiles');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/tiles', tilesRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Tile scrambling server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
