const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Đây là "key" scramble đơn giản
const OFFSET_X = 1000;
const OFFSET_Y = 2000;

// Cho Express phục vụ file frontend trong thư mục public
app.use(express.static(path.join(__dirname, "public")));

// Endpoint nhận tile đã bị scramble
app.get("/tiles/:z/:fakeX/:fakeY.png", async (req, res) => {
  try {
    const z = Number(req.params.z);
    const fakeX = Number(req.params.fakeX);
    const fakeY = Number(req.params.fakeY);

    // Server giải scramble để lấy tọa độ thật
    const realX = fakeX - OFFSET_X;
    const realY = fakeY - OFFSET_Y;

    console.log("Fake:", { z, fakeX, fakeY });
    console.log("Real:", { z, realX, realY });

    // URL tile thật từ OpenStreetMap
    const realTileUrl = `https://tile.openstreetmap.org/${z}/${realX}/${realY}.png`;

    // Server tự đi lấy tile thật
    const response = await axios.get(realTileUrl, {
      responseType: 'arraybuffer',
      headers: {
        "User-Agent": "TileScramblingPractica/1.0"
      }
    });

    res.setHeader("Content-Type", "image/png");
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});