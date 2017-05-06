var Utils = require('./utils');

// TODO: fix (global)
window.worldMap = [];

// FIX: should load 
var loadMap = function() {
  let map = p5Images['map.png'];

  for (let row = 0; row < map.height; row++) {

    worldMap.push(new Array(map.width));

    for (let col = 0; col < map.width; col++) {

      let index = row * (map.width * 4) + (col * 4);

      let r = map.pixels[index + 0];
      let g = map.pixels[index + 1];
      let b = map.pixels[index + 2];
      let a = map.pixels[index + 3];

      let hex = b << 16 | g << 8 | r;
      //Utils.RGBToHex(r, g, b);
      // console.log(r,g,b,hex);
      worldMap[row][col] = hex;
    }
  }
};

module.exports = loadMap;
