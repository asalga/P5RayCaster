const kb = require('keyboardjs');
const p5 = require('p5');
const cfg = require('./config');
const Renderer = require('./Renderer2D');
const user = require('./User');

window.p5Images = {};

let lastTime = Date.now();
let now = Date.now();

var newp5 = new p5(function(s) {
  'use strict';


  let renderer = null;
  let hud = null;

  //
  s.preload = function() {
    cfg.textures.forEach(function(v, i, a) {
      p5Images[v] = s.loadImage(v);
    });
    hud = s.loadImage('hud.png');
  };

  s.draw = function() {
    now = Date.now();

    let dt = (now - lastTime) / 1000.0;
    lastTime = Date.now();

    user.update(dt);
    renderer.render();

    s.image(hud,0,cfg.height-hud.height);

    document.getElementById('debug').innerHTML =  dt;
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
