# Tile Scrambling Project

A tile map protection system using coordinate scrambling technique.

## Description

This project protects tile-based map layers from unauthorized copying. Before sending a tile request to the server, the client transforms the tile coordinates. The server applies the reverse transformation and returns the real data. As a result, an attacker inspecting browser requests (F12 → Network) cannot reconstruct the original map coverage.

## How It Works

### Client Side (Scrambling)
```javascript
const OFFSET_X = 1000;
const OFFSET_Y = 2000;

fakeX = realX + OFFSET_X;  // Transform X coordinate
fakeY = realY + OFFSET_Y;  // Transform Y coordinate
```

### Server Side (Unscrambling)
```javascript
realX = fakeX - OFFSET_X;  // Reverse transform X
realY = fakeY - OFFSET_Y;  // Reverse transform Y
```

## Project Structure

```
.
├── server.js           # Express server with unscrambling logic
├── package.json        # Project dependencies
├── public/
│   └── index.html      # Client with Leaflet map
└── README.md
```

## Technologies

- **Server**: Node.js + Express + Axios
- **Client**: HTML5 + Leaflet.js
- **Tile Source**: OpenStreetMap (raster tiles)

## Installation and Running

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open your browser:
```
http://localhost:3000
```

## Demo

1. Open DevTools (F12)
2. Go to **Network** tab
3. Refresh the page or move the map
4. Look at `tiles/z/x/y.png` requests - coordinates will be scrambled

### Request Example:
- **URL in browser**: `/tiles/14/10326/6742.png` (scrambled)
- **Real coordinate**: `(9326, 4742)` (on OpenStreetMap)
- **Offset**: `+1000` for X, `+2000` for Y

## Console Logs

In the browser console, you can see the scrambling process:
```
Client real: { z: 14, realX: 9326, realY: 4742 }
Client fake: { z: 14, fakeX: 10326, fakeY: 6742 }
```

In the server terminal, you can see the unscrambling process:
```
Fake: { z: 14, fakeX: 10326, fakeY: 6742 }
Real: { z: 14, realX: 9326, realY: 4742 }
```

## Security

This method prevents:
- Direct tile copying using visible coordinates
- Automated map downloading by simple scripts
- Map reconstruction by attackers through Network request analysis

## Author

Practical work on tile map protection
