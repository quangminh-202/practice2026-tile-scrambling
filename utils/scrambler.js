const { OFFSET_X, OFFSET_Y } = require('../config/constants');

/**
 * Scramble tile coordinates by adding offsets
 * @param {number} x - Real X coordinate
 * @param {number} y - Real Y coordinate
 * @returns {object} Scrambled coordinates
 */
function scramble(x, y) {
  return {
    x: x + OFFSET_X,
    y: y + OFFSET_Y
  };
}

/**
 * Unscramble tile coordinates by subtracting offsets
 * @param {number} fakeX - Scrambled X coordinate
 * @param {number} fakeY - Scrambled Y coordinate
 * @returns {object} Real coordinates
 */
function unscramble(fakeX, fakeY) {
  return {
    x: fakeX - OFFSET_X,
    y: fakeY - OFFSET_Y
  };
}

module.exports = { scramble, unscramble };
