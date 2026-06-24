/**
 * Custom Leaflet TileLayer that scrambles coordinates before requesting tiles
 */
class ScrambledTileLayer extends L.TileLayer {
  constructor(url, options) {
    super(url, options);
    this.offsetX = options.offsetX || 0;
    this.offsetY = options.offsetY || 0;
  }

  /**
   * Override getTileUrl to scramble coordinates
   * @param {object} coords - Tile coordinates {x, y, z}
   * @returns {string} URL with scrambled coordinates
   */
  getTileUrl(coords) {
    const z = coords.z;
    const realX = coords.x;
    const realY = coords.y;

    // Scramble coordinates before sending to server
    const fakeX = realX + this.offsetX;
    const fakeY = realY + this.offsetY;

    // Log for debugging (can be removed in production)
    if (this.options.debug) {
      console.log('Real coords:', { z, x: realX, y: realY });
      console.log('Scrambled coords:', { z, x: fakeX, y: fakeY });
    }

    // Return URL with scrambled coordinates
    return `/tiles/${z}/${fakeX}/${fakeY}.png`;
  }
}
