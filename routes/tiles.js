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

    const { x: realX, y: realY } = unscramble(fakeX, fakeY);

    console.log('Scrambled:', { z, x: fakeX, y: fakeY });
    console.log('Real:', { z, x: realX, y: realY });

    const realTileUrl = `${TILE_SOURCE}/${z}/${realX}/${realY}.png`;

    const response = await axios.get(realTileUrl, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'TileScramblingProject/1.0'
      }
    });

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching tile:', error.message);
    
    if (error.response?.status === 404) {
      res.status(404).send('Tile not found');
    } else {
      res.status(500).send('Server error');
    }
  }
});

module.exports = router;
