# Tile Scrambling Project

A simple demonstration of tile coordinate obfuscation technique.

## Description

This project demonstrates a basic coordinate scrambling mechanism for tile-based maps. Before sending a tile request to the server, the client transforms the tile coordinates by adding constant offsets. The server applies the reverse transformation and returns the real data.

**Note**: This is a simple obfuscation technique for educational purposes. Since the offset values are exposed in client-side JavaScript, a determined user could still reverse-engineer the original coordinates. For production use, more sophisticated methods would be required.

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
├── config/
│   └── constants.js        # Configuration constants
├── routes/
│   └── tiles.js           # Tile endpoint routes
├── utils/
│   └── scrambler.js       # Scrambling/unscrambling logic
├── public/
│   ├── css/
│   │   └── styles.css     # Application styles
│   ├── js/
│   │   ├── config.js      # Client-side configuration
│   │   ├── scrambled-tile-layer.js  # Custom Leaflet layer
│   │   └── map.js         # Map initialization
│   └── index.html         # Main HTML page
├── server.js              # Express server entry point
├── package.json           # Project dependencies
├── .gitignore            # Git ignore rules
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
When you view the map at a certain location, the Network tab shows requests like:

```
Request URL: http://localhost:3000/tiles/14/10326/6742.png
Method: GET
Status: 200 OK
Type: png
```

Breaking down the coordinates:
- **Scrambled X**: 10326 (visible in Network tab)
- **Scrambled Y**: 6742 (visible in Network tab)
- **Real X**: 9326 (original tile coordinate: 10326 - 1000)
- **Real Y**: 4742 (original tile coordinate: 6742 - 2000)

An observer monitoring network traffic will only see the scrambled coordinates (10326, 6742), not the real tile location (9326, 4742).

## Limitations

- Client-side offsets are visible in JavaScript source code
- A user with developer knowledge can inspect the code to find OFFSET_X and OFFSET_Y
- This is a demonstration of the concept, not a production-ready security solution
- For real protection, server-side session-based scrambling or encryption would be needed

## Author

Practical work on tile map protection
