let Utils = {
  RGBToHex(r, g, b) {
    return r << 16 | g << 8 | b;
  }
}

module.exports = Utils;
