/*
  @pjs preload='map1.png','tes11.png';
*/

PImage myMap = loadImage('map1.png');
myMap.loadPixels();

if (myMap.width === 0 || myMap.height === 0) {
  throw "Map level not loaded!";
}


let worldMap = [];
for (let i = 0; i < 30; i++) {
  worldMap[i] = new Array(30);
}

let objects = {};
objects[color(0, 0, 0)] = 0;
objects[color(0, 0, 255)] = 1;
objects[color(0, 255, 255)] = 2;
//objects[color(255,0,0)]  = 3;

// iterate over image
for (let row = 0; row < myMap.height; row++) {
  for (let col = 0; col < myMap.width; col++) {
    color c = color(myMap.pixels[row * myMap.height + col]);
    if (green(c) === 255 && red(c) === 0 && blue(c) === 0) {
      worldMap[row][col] = 0;
    } else {
      worldMap[row][col] = objects[c];
    }
  }
}
;class RayDebugger {
  private ArrayList strings;
  private PFont font;
  private int fontSize;
  private boolean isOn;

  public RayDebugger() {
    isOn = true;
    strings = new ArrayList();
    fontSize = 15;
    font = createFont("Arial", fontSize);
  }

  public void addString(String s) {
    if (isOn) {
      strings.add(s);
    }
  }

  public void clear() {
    strings.clear();
  }

  public void toggle() {
    isOn = !isOn;
  }

  public void draw() {
    if (isOn) {
      int y = 20;
      fill(255);
      for (int i = 0; i < strings.size(); i++, y += fontSize) {
        textFont(font);
        text((String) strings.get(i), 0, y);
      }
    }
  }
}
;/*
 * Classes poll keyboard state to get state of keys.
 */
public static class Keyboard {

  private static final int NUM_KEYS = 128;

  // Locking keys are good for toggling things.
  // After locking a key, when a user presses and releases a key, it will register and
  // being 'down' (even though it has been released). Once the user presses it again,
  // it will register as 'up'.
  private static boolean[] lockableKeys = new boolean[NUM_KEYS];

  // Use char since we only need to store 2 states (0, 1)
  private static char[] lockedKeyPresses = new char[NUM_KEYS];

  // The key states, true if key is down, false if key is up.
  private static boolean[] keys = new boolean[NUM_KEYS];

  /*
   * The specified keys will stay down even after user releases the key.
   * Once they press that key again, only then will the key state be changed to up(false).
   */
  public static void lockKeys(int[] keys) {
    for (int k: keys) {
      if (isValidKey(k)) {
        lockableKeys[k] = true;
      }
    }
  }

  /*
   * TODO: if the key was locked and is down, then we unlock it, it needs to 'pop' back up.
   */
  public static void unlockKeys(int[] keys) {
    for (int k: keys) {
      if (isValidKey(k)) {
        lockableKeys[k] = false;
      }
    }
  }

  /*
   *
   */
  public static void reset() {

  }

  /* This is for the case when we want to start off the game
   * assuming a key is already down.
   */
  public static void setVirtualKeyDown(int key, boolean state) {
    setKeyDown(key, true);
    setKeyDown(key, false);
  }

  /**
   */
  private static boolean isValidKey(int key) {
    return (key > -1 && key < NUM_KEYS);
  }

  /*
   * Set the state of a key to either down (true) or up (false)
   */
  public static void setKeyDown(int key, boolean state) {

    if (isValidKey(key)) {

      // If the key is lockable, as soon as we tell the class the key is down, we lock it.
      if (lockableKeys[key]) {
        // First time pressed
        if (state == true && lockedKeyPresses[key] == 0) {
          lockedKeyPresses[key]++;
          keys[key] = true;
        }
        // First time released
        else if (state == false && lockedKeyPresses[key] == 1) {
          lockedKeyPresses[key]++;
        }
        // Second time pressed
        else if (state == true && lockedKeyPresses[key] == 2) {
          lockedKeyPresses[key]++;
        }
        // Second time released
        else if (state == false && lockedKeyPresses[key] == 3) {
          lockedKeyPresses[key] = 0;
          keys[key] = false;
        }
      } else {
        keys[key] = state;
      }
    }
  }

  /* 
   * Returns true if the specified key is down.
   */
  public static boolean isKeyDown(int key) {
    return keys[key];
  }
}

// These are outside of keyboard simply because I don't want to keep
// typing Keyboard.KEY_* in the main Tetrissing.pde file
final int KEY_BACKSPACE = 8;
final int KEY_TAB = 9;
final int KEY_ENTER = 10;

final int KEY_SHIFT = 16;
final int KEY_CTRL = 17;
final int KEY_ALT = 18;

final int KEY_CAPS = 20;
final int KEY_ESC = 27;

final int KEY_SPACE = 32;
final int KEY_PGUP = 33;
final int KEY_PGDN = 34;
final int KEY_END = 35;
final int KEY_HOME = 36;

final int KEY_LEFT = 37;
final int KEY_UP = 38;
final int KEY_RIGHT = 39;
final int KEY_DOWN = 40;

final int KEY_0 = 48;
final int KEY_1 = 49;
final int KEY_2 = 50;
final int KEY_3 = 51;
final int KEY_4 = 52;
final int KEY_5 = 53;
final int KEY_6 = 54;
final int KEY_7 = 55;
final int KEY_8 = 56;
final int KEY_9 = 57;

final int KEY_A = 65;
final int KEY_B = 66;
final int KEY_C = 67;
final int KEY_D = 68;
final int KEY_E = 69;
final int KEY_F = 70;
final int KEY_G = 71;
final int KEY_H = 72;
final int KEY_I = 73;
final int KEY_J = 74;
final int KEY_K = 75;
final int KEY_L = 76;
final int KEY_M = 77;
final int KEY_N = 78;
final int KEY_O = 79;
final int KEY_P = 80;
final int KEY_Q = 81;
final int KEY_R = 82;
final int KEY_S = 83;
final int KEY_T = 84;
final int KEY_U = 85;
final int KEY_V = 86;
final int KEY_W = 87;
final int KEY_X = 88;
final int KEY_Y = 89;
final int KEY_Z = 90;

// Function keys
final int KEY_F1 = 112;
final int KEY_F2 = 113;
final int KEY_F3 = 114;
final int KEY_F4 = 115;
final int KEY_F5 = 116;
final int KEY_F6 = 117;
final int KEY_F7 = 118;
final int KEY_F8 = 119;
final int KEY_F9 = 120;
final int KEY_F10 = 121;
final int KEY_F12 = 122;

//final int KEY_INSERT = 155;
;/*
  Andor Salga
  Line grid algorithm from lodev.org
*/
const imageWidth = 64;
//RayDebugger debug1;

// 
PVector pos = new PVector(21, 7);
PVector dir = new PVector(-1, 0);
PVector right = new PVector(0, -1);


let rot = 0;
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
let texData = new ArrayBuffer(64 * 64 * 4);
let texBuff8 = new Uint8ClampedArray(texData);
let texBuff32 = new Uint32Array(texData);

// Put these in a user controller class
const ROT_SPEED = 0.05;
float walkSpeed = 5;

void setup() {
  size(320, 240, P2D);

  texture = loadImage('tes11.png');
  texture.loadPixels();

  //
  for (let i = 0; i < 64 * 64; i++) {
    color c = texture.pixels[i];
    texBuff8[i * 4] = blue(c);
    texBuff8[i * 4 + 1] = green(c);
    texBuff8[i * 4 + 2] = red(c);
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
void update(dt) {
  if (Keyboard.isKeyDown(KEY_LEFT)) {
    rot += ROT_SPEED;
  }
  if (Keyboard.isKeyDown(KEY_RIGHT)) {
    rot -= ROT_SPEED;
  }
  if (Keyboard.isKeyDown(KEY_UP)) {
    moveCharacter(1, dt);
  }
  if (Keyboard.isKeyDown(KEY_DOWN)) {
    moveCharacter(-1, dt);
  }
}

void moveCharacter(doNegate, dt) {
  let oldPosX = pos.x;
  let oldPosY = pos.y;

  pos.x += doNegate * dir.x * walkSpeed * dt;
  pos.y += doNegate * dir.y * walkSpeed * dt;

  if (worldMap[floor(pos.x)][floor(pos.y)] !== 0) {
    pos.x = oldPosX;
    pos.y = oldPosY;
  }
}

/*
    
*/
void clearBackgroundBuffer() {
  for (let i = 0; i < width * height; i++) {
    let lightGrey = 50;
    buf32[i] = 0xFF000000 | lightGrey << 16 | lightGrey << 8 | lightGrey;
  }

  for (let i = width * height / 2; i < width * height; i++) {
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
  dir.x = cos(rot);
  dir.y = -sin(rot);

  right.x = sin(rot);
  right.y = cos(rot);

  let startX = 0;
  let mapX;
  let mapY;
    let sideDistX;
    let sideDistY;

  // For every vertical line on the viewport...
  for (let x = startX; x < width - startX; x++) {

    let camX = (2 * x / width) - 1;
    PVector rayPos = new PVector(pos.x, pos.y);
    PVector rayDir = new PVector(dir.x + right.x * camX, dir.y + right.y * camX);

    mapX = Math.floor(rayPos.x);
    mapY = Math.floor(rayPos.y);

    let scaleX = 1 / rayDir.x;
    let scaleY = 1 / rayDir.y;

    // scale the vector by the inverse of the x component,
    // which makes the x component equal to one.
    // then calculate the magnitude
    let deltaDistX = (new PVector(1, rayDir.y * scaleX)).mag();
    let deltaDistY = (new PVector(1, rayDir.x * scaleY)).mag();

    let wallDist;
    let stepX, stepY;
    let hit = 0;
    let side = 0;

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
    if (side == 0) {
      wallDist = abs((mapX - rayPos.x + (1.0 - stepX) / 2.0) / rayDir.x);
      perpWallDist = wallDist;
    } else {
      wallDist = abs((mapY - rayPos.y + (1.0 - stepY) / 2.0) / rayDir.y);
      perpWallDist = wallDist;
    }

    if (side === 0) {
      wallX = rayPos.y + perpWallDist * rayDir.y;
    } else {
      wallX = rayPos.x + perpWallDist * rayDir.x;
    }

    wallX -= Math.floor(wallX);

    let lineHeight = abs(height / wallDist);
    var realLineHeight = lineHeight;

    lineHeight = min(lineHeight, height);
    let texX = floor(wallX * 64);

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
    let cvsStartY = floor(height / 2 - lineHeight / 2) * width;
    let cvsEndY = cvsStartY + (lineHeight * width);

    // To be more efficient, we start iterating only where the actual sliver begins.
    // We also exit early, only iterating up to the end of the sliver.
    for (let viewPortY = cvsStartY; viewPortY < cvsEndY; viewPortY += width) {

      // sliverHeightPx ranges from 0..height
      let sliverHeightPx = (cvsEndY - cvsStartY) / width;

      //
      var texYNormalized = ((viewPortY / width) - (cvsStartY / width)) / sliverHeightPx;

      // map 0..1 to 0..imageHeight
      var yTexel = floor(start + (end - start) * texYNormalized);
      // let ySampleEnd = 64 - ySampleStart;
      // yTexel = ySampleStart + imageWidth * floor( ySampleEnd * texYpercent);

      let tex = yTexel * (imageWidth * 4) + texX * 4;

      let [b, g, r] = [sampleTexture(tex) << 16, sampleTexture(tex + 1) << 8, sampleTexture(tex + 2)];
      buf32[x + viewPortY] = 0xFF000000 | b | g | r;
    }
  }

  let delta = (now - lastTime) / 1000.0;

  debug.addString('fps:' + frameRate);
  debug.addString('delta:' + delta);

  update(delta);
  imageData.data.set(buf8);
  ctx.putImageData(imageData, 0, 0);
  debug.draw();
  lastTime = Date.now();
}

function sampleTexture(index) {
  return texBuff8[index];
}

void keyReleased() {
  Keyboard.setKeyDown(keyCode, false);
}

void keyPressed() {
  Keyboard.setKeyDown(keyCode, true);

  if (Keyboard.isKeyDown(KEY_R)) {
    lineWeight += 2;
  }
  if (Keyboard.isKeyDown(KEY_E)) {
    lineWeight -= 2;
    lineWeight = max(1, lineWeight);
  }

  if (Keyboard.isKeyDown(KEY_Q)) {
    gameWidth -= 50;
    height -= 50;
  }

  if (Keyboard.isKeyDown(KEY_W)) {
    gameWidth += 50;
    height += 50;
  }

  if (Keyboard.isKeyDown(KEY_D)) {
    debug.toggle();
  }
}
