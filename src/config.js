var config = {
  width: 180 * 2,
  height: 120 * 2,
  textures: [
    'map.png',
    'bricks1.png',
    'bricks2.png'
  ],

  // pink
  // gold
  // tomato
  // teal
  //tan



  colorToImageMap: {

    // none....fix this
    0x000000: 'map.png',
    
    //red
    0xFF0000: 'bricks1.png',

    // green    
    0x00FF00: '',

    // blue
    0x0000FF: 'bricks2.png',

    // purple   
    0x800080: '',

    // maroon   
    0x800000: '',

    // black    
    0x000000: '',

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
