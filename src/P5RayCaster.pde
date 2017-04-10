/*
  @pjs preload='data/map1.png','data/tes11.png';
*/

/*
  Andor Salga
  Line grid algorithm from lodev.org
  My blog: 
  http://asalga.wordpress.com/2014/01/22/understanding-raycasting-step-by-step/
*/
const imageWidth = 64;
//RayDebugger debug1;

// 
PVector pos = new PVector(21, 7);
PVector dir = new PVector(-1, 0);
PVector right = new PVector(0, -1);
float FOV = 0.6f;

float rot = 0;
PVector frontBuffer = new PVector(0.5, 0);

let lastTime = Date.now(),
    now = Date.now();

PImage texture;

//
let canvas = document.getElementById("P5RayCaster"),
  ctx = canvas.getContext('2d'),
  arrBuff,
  buf8,
  buf32,
  imageData;

let textureData;
let texData = new ArrayBuffer(64*64*4);
let texBuff8 = new Uint8ClampedArray(texData);
let texBuff32 = new Uint32Array(texData);

// Put these in a user controller class
final float ROT_SPEED = 0.05f;
float walkSpeed = 5;

void setup() {
  size(640, 480, P2D);

  texture = loadImage('tes11.png');
  texture.loadPixels();

  //
  for(let i = 0; i < 64*64; i++){
    color c = texture.pixels[i];
    texBuff8[i*4] = blue(c);
    texBuff8[i*4 + 1] = green(c);
    texBuff8[i*4 + 2] = red(c);
  }

  imageData = ctx.getImageData(0, 0, width, height);
  arrBuff = new ArrayBuffer(imageData.data.length);

  buf8 = new Uint8ClampedArray(arrBuff);
  buf32 = new Uint32Array(arrBuff);

  strokeCap(PROJECT);
  debug = new RayDebugger();

  // Don't force the user to click on the canvas
  $('#pjs').focus();
}

/*

*/
void update(float dt){
  if(Keyboard.isKeyDown(KEY_LEFT)){
    rot += ROT_SPEED;
  }
  if(Keyboard.isKeyDown(KEY_RIGHT)){
    rot -= ROT_SPEED;
  }
  if(Keyboard.isKeyDown(KEY_UP)){
    moveCharacter(1, dt);   
  }
  if(Keyboard.isKeyDown(KEY_DOWN)){
    moveCharacter(-1, dt);
  }
}

void moveCharacter(doNegate, dt){
  let oldPosX = pos.x;
  let oldPosY = pos.y;

  pos.x += doNegate * dir.x * walkSpeed * dt;
  pos.y += doNegate * dir.y * walkSpeed * dt;

  if(worldMap[floor(pos.x)][floor(pos.y)] !== 0){
    pos.x = oldPosX;
    pos.y = oldPosY;
  } 
}

/*
    
*/
void clearBackgroundBuffer(){
  for(let i = 0; i < width * height; i++){
    let lightGrey = 50;
    buf32[i] = 0xFF000000 | lightGrey << 16 | lightGrey << 8 | lightGrey;
  }
  
  for(let i = width * height/2; i < width * height; i++){
    let darkGrey = 120;
    buf32[i] = 0xFF000000 | darkGrey << 16 | darkGrey << 8 | darkGrey;
  }
}

/*
*/
void draw() {
  now = Date.now();
  clearBackgroundBuffer();
  debug.clear();
  
  //
  dir.x =  cos(rot);
  dir.y = -sin(rot);

  right.x = sin(rot);
  right.y = cos(rot);

  int startX = 0;

  // For every vertical line on the viewport...
  for (int x = startX; x < width - startX; x++) {

    float camX = 2.0f * x / float(width) - 1;
    PVector rayPos = new PVector(pos.x, pos.y);
    PVector rayDir = new PVector(dir.x + right.x * camX, dir.y + right.y * camX);

    int mapX = int(rayPos.x);
    int mapY = int(rayPos.y);

    float sideDistX;
    float sideDistY;

    float scaleX = 1.0 / rayDir.x;
    float scaleY = 1.0 / rayDir.y;

    // scale the vector by the inverse of the x component,
    // which makes the x component equal to one.
    // then calculate the magnitude
    float deltaDistX = (new PVector(1, rayDir.y * scaleX)).mag();
    float deltaDistY = (new PVector(1, rayDir.x * scaleY)).mag();

    float wallDist;
    int stepX, stepY;
    int hit = 0;
    int side = 0;

    if (rayDir.x < 0) {
      stepX = -1;
      sideDistX = (rayPos.x - mapX) * deltaDistX;
    } else {
      stepX = 1;
      sideDistX = (mapX + 1.0 - rayPos.x) * deltaDistX;
    }

    if (rayDir.y < 0) {
      stepY = -1;
      sideDistY = (rayPos.y - mapY) * deltaDistY;
    } else {
      stepY = 1;
      sideDistY = (mapY + 1.0 - rayPos.y) * deltaDistY;
    }

    ////////////////////////////////////////////////////////////////
    // Search
    while (hit == 0) {
      if (sideDistX < sideDistY) {
        sideDistX += deltaDistX;
        mapX += stepX;
        side = 0;
      } else {
        sideDistY += deltaDistY;
        mapY += stepY;
        side = 1;
    }

    if (worldMap[mapX][mapY] > 0) {
      hit = 1;
    }
  }
    
  ////////////////////////////////////////////////////////////////

    perpWallDist = 0;      
    //Calculate distance projected on camera direction (oblique distance will give fisheye effect!)
    if (side == 0){
      wallDist = abs((mapX - rayPos.x + (1.0 - stepX) / 2.0) / rayDir.x);
      perpWallDist =  wallDist;
    }
    else{
      wallDist = abs((mapY - rayPos.y + (1.0 - stepY) / 2.0) / rayDir.y);
      perpWallDist =  wallDist;
    }
    
    if(side === 0){
      wallX = rayPos.y + perpWallDist * rayDir.y;
    }
    else{
      wallX = rayPos.x + perpWallDist * rayDir.x;
    }
      
    wallX -= Math.floor(wallX);
   
    float lineHeight = abs(height / wallDist);
    var realLineHeight = lineHeight;
    
    lineHeight = min(lineHeight, height);
    let texX = floor(wallX * 64);
    
    // If we are so close to a wall that the wall sliver is greater than the viewport,
    // it means we must sample the texture 'lower down'.
    // For this sliver, assume we will display the entire 'y' texture
    let start = 0;
    let end = 64;

    //
    if(realLineHeight > height) {      
      // 8000 / 480 = 16.6
      texShownPercent = height/realLineHeight;

      // (480/8000) * 64
      let texelsToShow = texShownPercent * 64;
         
      start = 32 - (texelsToShow/2);
      end = 32 + (texelsToShow/2);
    }
    
    // where to start and end drawing on the canvas in the Y direction
    let cvsStartY = floor(height/2 - lineHeight/2) * width;
    let cvsEndY = cvsStartY + (lineHeight * width);
    
    // To be more efficient, we start iterating only where the actual sliver begins.
    // We also exit early, only iterating up to the end of the sliver.
    for(let viewPortY = cvsStartY; viewPortY < cvsEndY; viewPortY += width){
              
      // sliverHeightPx ranges from 0..height
      let sliverHeightPx = (cvsEndY - cvsStartY)/width;

      //
      var texYNormalized = ((viewPortY/width) - (cvsStartY/width)) / sliverHeightPx;
      
      // map 0..1 to 0..imageHeight
      var yTexel = floor( start + (end - start) * texYNormalized);
      // let ySampleEnd = 64 - ySampleStart;
      // yTexel = ySampleStart + imageWidth * floor( ySampleEnd * texYpercent);
      
      let tex = yTexel * (imageWidth * 4) + texX * 4;

      let [b,g,r] = [sampleTexture(tex) << 16, sampleTexture(tex+1) << 8,sampleTexture(tex+2)];
      buf32[x + viewPortY] = 0xFF000000 | b | g | r;
    }
  }
  
  let delta = (now - lastTime)/1000.0;
  
  debug.addString('fps:' + frameRate);
  debug.addString('delta:' + delta);
  
  update(delta);
  imageData.data.set(buf8);
  ctx.putImageData(imageData, 0, 0);
  debug.draw();
  lastTime = Date.now();
}

int sampleTexture(int index){
  return texBuff8[index];
}

void keyReleased(){
  Keyboard.setKeyDown(keyCode, false);
}

void keyPressed(){
  Keyboard.setKeyDown(keyCode, true);

  if(Keyboard.isKeyDown(KEY_R)){
    lineWeight += 2;
  }
  if(Keyboard.isKeyDown(KEY_E)){
    lineWeight -= 2;
    lineWeight = max(1, lineWeight);
  }

  if(Keyboard.isKeyDown(KEY_Q)){
    gameWidth -= 50;
    height -= 50;
  }

  if(Keyboard.isKeyDown(KEY_W)){
    gameWidth += 50;
    height += 50;
  }

  if(Keyboard.isKeyDown(KEY_D)){
    debug.toggle();
  }
}