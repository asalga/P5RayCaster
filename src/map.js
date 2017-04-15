let worldMap = [];

let mapping = {
  0x000000: 0,
  0x0000FF: 2,
};

var loadMap = function() {
  let myMap = {};
  let map = p5Images[0];
  myMap.width = map.width;
  myMap.height = map.height;

  for (let i = 0; i < myMap.height; i++) {
    worldMap.push(new Array(myMap.width));
  }

  // iterate over image
  for (let row = 0; row < myMap.height; row++) {
    for (let col = 0; col < myMap.width; col++) {

      let index = row * (myMap.width * 4) + (col * 4);

      let r = map.pixels[index + 0];
      let g = map.pixels[index + 1];
      let b = map.pixels[index + 2];
      let a = map.pixels[index + 3];
      
      if (r === 0 && g === 0 && b === 0) {
        worldMap[row][col] = 0;
      } else {

        // convert color into hex value

        //
        var hex = RGBToHex(r,g,b);
        console.log(hex);

        worldMap[row][col] = hex;
      }
    }
  }
};
