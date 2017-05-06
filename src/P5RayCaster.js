'use strict';

var cfg = require('./config');
var kb = require('keyboardjs');
var p5 = require('p5');
var Renderer = require('./Renderer');
var user = require('./User');

window.p5Images = {};

let lastTime = Date.now();
let now = Date.now();

var newp5 = new p5(function(s) {

  let renderer = null;

  //
  s.preload = function() {
    cfg.textures.forEach(function(v, i, a) {
      p5Images[v] = s.loadImage(v);
      // debugger;
    });
  };

  s.draw = function() {
    now = Date.now();

    let dt = (now - lastTime) / 1000.0;
    console.log(dt);

    lastTime = Date.now();

    user.update(dt);
    renderer.render();
  };

  s.keyPressed = function() {};

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
