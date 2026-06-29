const express = require('express');
const axios = require('axios');
const { TILE_SOURCE } = require('../config/constants');
const { unscramble } = require('../utils/scrambler');

const router = express.Router();

router.get('/:z/:fakeX/:fakeY.png', async (req, res) => {
  try {
    const z = Number(req.params.z);
    const fakeX = Number(req.params.fakeX);
    const fakeY = Number(req.params.fakeY);

    if (isNaN(z) || isNaN(fakeX) || isNaN(fakeY)) {
      return res.status(400).send('Invalid coordinates');
    }

    const { x: realX, y: realY } = unscramble(fakeX, fakeY);

    const realTileUrl = `${TILE_SOURCE}/${z}/${realX}/${realY}.png`;

    const response = await axios.get(realTileUrl, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'TileScramblingProject/1.0'
      },
      timeout: 5000
    });

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(response.data);
  } catch (error) {
    if (error.response?.status === 404) {
      res.status(404).send('Tile not found');
    } else if (error.code === 'ECONNABORTED') {
      res.status(504).send('Timeout');
    } else {
      res.status(502).send('Bad gateway');
    }
  }
});

module.exports = router;

