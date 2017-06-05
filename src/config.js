// TODO: convert to reading data file
var colorToImageMap = new Map();
colorToImageMap.set(0x000000, 'map.png');
colorToImageMap.set(0xFF0000, 'bricks1.png');
colorToImageMap.set(0x800080, 'purple');
colorToImageMap.set(0x0000FF, 'blue_bricks.png');
colorToImageMap.set(0x00FF00, 'green');
colorToImageMap.set(0x800000, 'maroon');
colorToImageMap.set(0xFF00FF, 'magenta');
colorToImageMap.set(0xFFFF00, 'yellow');
colorToImageMap.set(0xFFFFFF, 'white');
colorToImageMap.set(0x00FFFF, 'cyan');
colorToImageMap.set(0xFF00AA, 'deeppink');
colorToImageMap.set(0xFFA500, 'orange');
colorToImageMap.set(0x808080, 'grey');


var config = {
  width: 90 * 3,
  height: 60 * 3,
  textures: [
    'map.png',
    'bricks1.png',
    'bricks2.png',
    'blue_bricks.png'
  ],
  colorToImageMap
};


module.exports = config;
