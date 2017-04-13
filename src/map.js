// /*
//   @pjs preload='map1.png','tes11.png';
// */

// let myMap = loadImage('map1.png');
// myMap.loadPixels();

// if (myMap.width === 0 || myMap.height === 0) {
//   throw "Map level not loaded!";
// }

// let worldMap = [];
// for (let i = 0; i < 30; i++) {
//   worldMap[i] = new Array(30);
// }

// let objects = {};
// objects[color(0, 0, 0)] = 0;
// objects[color(0, 0, 255)] = 1;
// objects[color(0, 255, 255)] = 2;

// // iterate over image
// for (let row = 0; row < myMap.height; row++) {
//   for (let col = 0; col < myMap.width; col++) {
//     let c = color(myMap.pixels[row * myMap.height + col]);
    
//     if (c[0] === 0 && c[1] === 255 && c[2] === 0){
//       //green(c) === 255 && red(c) === 0 && blue(c) === 0) {
//       worldMap[row][col] = 0;
//     } else {
//       worldMap[row][col] = objects[c];
//     }
//   }
// }
