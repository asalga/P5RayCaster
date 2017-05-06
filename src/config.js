var config = {
  width: 180 * 1,
  height: 120 * 1,
  textures: [
    'map.png',
    'bricks1.png',
    'bricks2.png',
    'blue_bricks.png'
  ],

  // pink
  // gold
  // tomato
  // teal
  // tan

  colorToImageMap: {

    // none....fix this
    0x000000: 'map.png',

    // red
    0xFF0000: 'bricks1.png',

    // blue
    0x0000FF: 'blue_bricks.png',

    // green    
    0x00FF00: '',

    // purple   
    0x800080: '',

    // maroon   
    0x800000: '',

    // magenta  
    0xFF00FF: '',

    // yellow   
    0xFFFF00: '',

    // white    
    0xFFFFFF: '',

    // cyan     
    0x00FFFF: '',

    // deeppink 
    0xFF00AA: '',

    // orange   
    0xFFA500: '',

    // grey     
    0x808080: ''

  }
};

module.exports = config;
