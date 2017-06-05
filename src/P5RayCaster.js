// const kb = require('keyboardjs');
const p5 = require('p5');
const cfg = require('./config');
const Renderer = require('./Renderer2D');
const user = require('./User');
const PropViewer = require('./PropViewer');

window.p5Images = {};


let lastTime = Date.now();
let now = Date.now();

var newp5 = new p5(function(s) {

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
    PropViewer.clear();
    PropViewer.set('res', [cfg.width, cfg.height]);

    now = Date.now();

    let dt = (now - lastTime) / 1000.0;
    lastTime = Date.now();

    user.update(dt);
    renderer.render();

    s.image(hud, 0, cfg.height - hud.height);
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
