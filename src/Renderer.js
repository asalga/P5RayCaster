var mapping = require('./config').colorToImageMap;
var cfg = require('./config');



// var TextureStore = require('./TextureStore');
const imageWidth = 64;



let pos = [21, 7];
let dir = [1, 0];
let right = [0, 1];
const ROT_SPEED = 0.05;
let walkSpeed = 5;
let rot = 0;



function Renderer() {
  let canvas = $("#defaultCanvas0")[0];
  this.ctx = canvas.getContext('2d');

  this.cvsImageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);

  this.arrBuff = null;
  this.buf8 = null;
  this.buf32 = null;

  this.lastTime = Date.now();
  this.now = Date.now();
}

Renderer.prototype.init = function() {
  this.arrBuff = new ArrayBuffer(this.cvsImageData.data.length);
  this.buf8 = new Uint8ClampedArray(this.arrBuff);
  this.buf32 = new Uint32Array(this.arrBuff);
};


Renderer.prototype.sampleTexture = function(texID, index) {
  let tex = p5Images[texID];
  return tex.pixels[index];
}

/*
 */
Renderer.prototype.drawFloorAndCeiling = function() {
  let width = cfg.width,
    height = cfg.height;

  for (let i = 0; i < width * height; i++) {
    let lightGrey = 50;
    this.buf32[i] = 0xFF000000 | lightGrey << 16 | lightGrey << 8 | lightGrey;
  }

  for (let i = width * height / 2; i < width * height; i++) {
    let darkGrey = 120;
    this.buf32[i] = 0xFF000000 | darkGrey << 16 | darkGrey << 8 | darkGrey;
  }
};

/*
 */
Renderer.prototype.render = function() {
  let width = cfg.width;
  let height = cfg.height;

  rot += 0.01;
  this.now = Date.now();

  this.drawFloorAndCeiling();

  //
  dir[0] = Math.cos(rot);
  dir[1] = -Math.sin(rot);

  right[0] = Math.sin(rot);
  right[1] = Math.cos(rot);

  let startX = 0;
  let mapX;
  let mapY;
  let sideDistX;
  let sideDistY;

  // For every vertical line on the viewport...
  for (let x = startX; x < width - startX; x++) {

    let camX = (2 * x / width) - 1;
    let rayPos = [pos[0], pos[1]];
    let rayDir = [dir[0] + right[0] * camX, dir[1] + right[1] * camX];

    mapX = Math.floor(rayPos[0]);
    mapY = Math.floor(rayPos[1]);

    let scaleX = 1 / rayDir[0];
    let scaleY = 1 / rayDir[1];

    // scale the vector by the inverse of the x component,
    // which makes the x component equal to one.
    // then calculate the magnitude
    let test1 = [1, rayDir[1] * scaleX];
    let test2 = [1, rayDir[0] * scaleY];

    let deltaDistX = Math.sqrt(test1[0] * test1[0] + test1[1] * test1[1]);
    let deltaDistY = Math.sqrt(test2[0] * test2[0] + test2[1] * test2[1]);

    let wallDist;
    let stepX, stepY;
    let hit = 0;
    let side = 0;

    if (rayDir[0] < 0) {
      stepX = -1;
      sideDistX = (rayPos[0] - mapX) * deltaDistX;
    } else {
      stepX = 1;
      sideDistX = (mapX + 1 - rayPos[0]) * deltaDistX;
    }

    if (rayDir[1] < 0) {
      stepY = -1;
      sideDistY = (rayPos[1] - mapY) * deltaDistY;
    } else {
      stepY = 1;
      sideDistY = (mapY + 1.0 - rayPos[1]) * deltaDistY;
    }

    let texID = 0;
    ////////////////////////////////////////////////////////////////
    // Search
    while (hit === 0) {
      if (sideDistX < sideDistY) {
        sideDistX += deltaDistX;
        mapX += stepX;
        side = 0;
      } else {
        sideDistY += deltaDistY;
        mapY += stepY;
        side = 1;
      }

      if (worldMap[mapX][mapY] !== 0) {
        hit = 1;
        texID = mapping[worldMap[mapX][mapY]];
      }
    }

    ////////////////////////////////////////////////////////////////

    perpWallDist = 0;
    //Calculate distance projected on camera direction (oblique distance will give fisheye effect!)
    if (side === 0) {
      wallDist = Math.abs((mapX - rayPos[0] + (1 - stepX) / 2) / rayDir[0]);

    } else {
      wallDist = Math.abs((mapY - rayPos[1] + (1 - stepY) / 2) / rayDir[1]);
    }
    perpWallDist = wallDist;
    if (side === 0) {
      wallX = rayPos[1] + perpWallDist * rayDir[1];
    } else {
      wallX = rayPos[0] + perpWallDist * rayDir[0];

    }

    // get the fractional part
    // 7.0375 - 7
    wallX = wallX - Math.floor(wallX);

    let lineHeight = Math.abs(height / wallDist);
    var realLineHeight = lineHeight;

    lineHeight = Math.min(lineHeight, height);
    let texX = Math.floor(wallX * 64);


    // If we are so close to a wall that the wall sliver is greater than the viewport,
    // it means we must sample the texture 'lower down'.
    // For this sliver, assume we will display the entire 'y' texture
    let start = 0;
    let end = 64;

    //
    if (realLineHeight > height) {
      // 8000 / 480 = 16.6
      texShownPercent = height / realLineHeight;

      // (480/8000) * 64
      let texelsToShow = texShownPercent * 64;

      start = 32 - (texelsToShow / 2);
      end = 32 + (texelsToShow / 2);
    }

    // where to start and end drawing on the canvas in the Y direction
    let cvsStartY = Math.floor(height / 2 - lineHeight / 2) * width;
    let cvsEndY = cvsStartY + (lineHeight * width);

    // To be more efficient, we start iterating only where the actual sliver begins.
    // We also exit early, only iterating up to the end of the sliver.
    for (let viewPortY = cvsStartY; viewPortY < cvsEndY; viewPortY += width) {

      // sliverHeightPx ranges from 0..height
      let sliverHeightPx = (cvsEndY - cvsStartY) / width;

      //
      var texYNormalized = ((viewPortY / width) - (cvsStartY / width)) / sliverHeightPx;

      // map 0..1 to 0..imageHeight
      var yTexel = Math.floor(start + (end - start) * texYNormalized);
      // let ySampleEnd = 64 - ySampleStart;
      // yTexel = ySampleStart + imageWidth * Math.floor( ySampleEnd * texYpercent);

      let tex = yTexel * (imageWidth * 4) + texX * 4;

      let [r, g, b] = [
        this.sampleTexture(texID, tex + 2) << 16,
        this.sampleTexture(texID, tex + 1) << 8,
        this.sampleTexture(texID, tex + 0)
      ];

      this.buf32[x + viewPortY] = 0xFF000000 | b | g | r;
    }
  }

  let delta = (this.now - this.lastTime) / 1000.0;

  // update(delta);
  this.cvsImageData.data.set(this.buf8);
  this.ctx.putImageData(this.cvsImageData, 0, 0);
  lastTime = Date.now();
}

module.exports = Renderer;
