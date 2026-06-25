class ScrambledTileLayer extends L.TileLayer {
  constructor(url, options) {
    super(url, options);
    this.offsetX = options.offsetX || 0;
    this.offsetY = options.offsetY || 0;
  }

  getTileUrl(coords) {
    const z = coords.z;
    const realX = coords.x;
    const realY = coords.y;

    const fakeX = realX + this.offsetX;
    const fakeY = realY + this.offsetY;

    if (this.options.debug) {
      console.log('Real coords:', { z, x: realX, y: realY });
      console.log('Scrambled coords:', { z, x: fakeX, y: fakeY });
    }

    return `/tiles/${z}/${fakeX}/${fakeY}.png`;
  }
}
