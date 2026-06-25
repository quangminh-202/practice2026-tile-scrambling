const { OFFSET_X, OFFSET_Y } = require('../config/constants');

function scramble(x, y) {
  return {
    x: x + OFFSET_X,
    y: y + OFFSET_Y
  };
}

function unscramble(fakeX, fakeY) {
  return {
    x: fakeX - OFFSET_X,
    y: fakeY - OFFSET_Y
  };
}

module.exports = { scramble, unscramble };
