

function Texture() {
}

let texData = new ArrayBuffer(64 * 64 * 4);
let texBuff8 = new Uint8ClampedArray(texData);
let texBuff32 = new Uint32Array(texData);

//   texture = loadImage('tes11.png');
//   texture.loadPixels();

//   //
//   for (let i = 0; i < 64 * 64; i++) {
//     color c = texture.pixels[i];
//     texBuff8[i * 4] = blue(c);
//     texBuff8[i * 4 + 1] = green(c);
//     texBuff8[i * 4 + 2] = red(c);
//   }

//   imageData = ctx.getImageData(0, 0, width, height);
//   arrBuff = new ArrayBuffer(imageData.data.length);

//   buf8 = new Uint8ClampedArray(arrBuff);
//   buf32 = new Uint32Array(arrBuff);

//   strokeCap(PROJECT);
//   debug = new RayDebugger();

//   // Don't force the user to click on the canvas
//   $('#pjs').focus();

Texture.prototype = {

  getImage: function() {
    return 0;
  }
};
