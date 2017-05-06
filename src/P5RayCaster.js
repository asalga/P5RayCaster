'use strict';

var cfg = require('./config');
var kb = require('keyboardjs');
var p5 = require('p5');
var Renderer = require('./Renderer');

window.p5Images = {};


var newp5 = new p5(function(s) {

  let renderer = null;

  //
  s.preload = function() {
    cfg.textures.forEach(function(v, i, a) {
      p5Images[v] = s.loadImage(v);
      debugger;
    });
  };

  s.draw = function() {
    renderer.render();
  };

  s.keyPressed = function() {
  };

  s.setup = function() {
    s.createCanvas(cfg.width, cfg.height);
    renderer = new Renderer();
    renderer.init();

    for (let i in p5Images) {
      p5Images[i].loadPixels();
    }

    require('./map')();
  };
});

//
// void update(dt) {
//   if (Keyboard.isKeyDown(KEY_LEFT)) {
//     rot += ROT_SPEED;
//   }
//   if (Keyboard.isKeyDown(KEY_RIGHT)) {
//     rot -= ROT_SPEED;
//   }
//   if (Keyboard.isKeyDown(KEY_UP)) {
//     moveCharacter(1, dt);
//   }
//   if (Keyboard.isKeyDown(KEY_DOWN)) {
//     moveCharacter(-1, dt);
//   }
// }

// void moveCharacter(doNegate, dt) {
//   let oldPosX = pos.x;
//   let oldPosY = pos.y;

//   pos.x += doNegate * dir.x * walkSpeed * dt;
//   pos.y += doNegate * dir.y * walkSpeed * dt;

//   if (worldMap[Math.floor(pos.x)][Math.floor(pos.y)] !== 0) {
//     pos.x = oldPosX;
//     pos.y = oldPosY;
//   }
// }

// /*

// */

// void keyReleased() {
//   Keyboard.setKeyDown(keyCode, false);
// }

// void keyPressed() {
//   Keyboard.setKeyDown(keyCode, true);

//   if (Keyboard.isKeyDown(KEY_R)) {
//     lineWeight += 2;
//   }
//   if (Keyboard.isKeyDown(KEY_E)) {
//     lineWeight -= 2;
//     lineWeight = max(1, lineWeight);
//   }

//   if (Keyboard.isKeyDown(KEY_Q)) {
//     gameWidth -= 50;
//     height -= 50;
//   }

//   if (Keyboard.isKeyDown(KEY_W)) {
//     gameWidth += 50;
//     height += 50;
//   }

//   if (Keyboard.isKeyDown(KEY_D)) {
//     debug.toggle();
//   }
// }
