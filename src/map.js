let myMap = {};
// let myMap = loadImage('map1.png');
// myMap.loadPixels();

myMap.width = myMap.height = 30;

if (myMap.width === 0 || myMap.height === 0) {
  throw "Map level not loaded!";
}


let worldMap = [];
worldMap[0] = [1,1,1,1,1,1,1,1,1];
worldMap[1] = [1,0,0,0,0,0,0,0,1];
worldMap[2] = [1,0,0,0,0,0,0,0,1];
worldMap[3] = [1,0,0,0,0,0,0,0,1];
worldMap[4] = [1,0,0,0,0,0,0,0,1];
worldMap[5] = [1,0,0,0,0,0,0,0,1];
worldMap[6] = [1,1,1,1,1,1,1,1,1];
//worldMap[29] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

//f//or (let i = 1; i < 5; i++) {
 // worldMap[i] = 
  //1,1,1,1,1,1,1,1,1
  // [1,0,0,0,0,0,0,0,1];
  //new Array(30);
//}



let objects = {};
// objects[color(0, 0, 0)] = 0;
// objects[color(0, 0, 255)] = 1;
// objects[color(0, 255, 255)] = 2;
//objects[color(255,0,0)]  = 3;

// iterate over image
for (let row = 0; row < myMap.height; row++) {
  for (let col = 0; col < myMap.width; col++) {
    // let c = color(myMap.pixels[row * myMap.height + col]);
    //if (green(c) === 255 && red(c) === 0 && blue(c) === 0) {
    // worldMap[row][col] = 0;
    //  } else {
    //worldMap[row][col] = 1; //objects[c];
    // }
  }
}
