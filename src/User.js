let kb = require('keyboardjs');

let Keys = {};

const RotSpeed = 1.85;
const WalkSpeed = 2;

let pressed = function(e) {
  Keys[e.code] = true;
};
let released = function(e) {
  Keys[e.code] = false;
};

kb.bind('left', pressed, released);
kb.bind('right', pressed, released);
kb.bind('up', pressed, released);
kb.bind('down', pressed, released);

let User = {
  rot: 0,
  pos: [21, 7],
  dir: [1, 0],
  right: [0, 1],

  moveCharacter: function(doNegate, dt) {
    let oldPosX = this.pos[0];
    let oldPosY = this.pos[1];

    this.pos[0] += doNegate * this.dir[0] * WalkSpeed * dt;
    this.pos[1] += doNegate * this.dir[1] * WalkSpeed * dt;
    // console.log(this.pos);
    // if (worldMap[Math.floor(pos.x)][Math.floor(pos.y)] !== 0) {
    //   pos.x = oldPosX;
    //   pos.y = oldPosY;
    // }
  },

  update: function(dt) {
    // console.log(dt);
    let dirty = false;

    if (Keys['ArrowRight']) {
      this.rot -= RotSpeed * dt;
      dirty = true;

    }
    if (Keys['ArrowLeft']) {
      this.rot += RotSpeed * dt;
      dirty = true;
    }
    if (Keys['ArrowUp']) {
      this.moveCharacter(1, dt);
      dirty = true;
    }
    if (Keys['ArrowDown']) {
      this.moveCharacter(-1, dt);
      dirty = true;
    }

    if (dirty) {
      this.dir[0] = Math.cos(this.rot);
      this.dir[1] = -Math.sin(this.rot);
      this.right[0] = Math.sin(this.rot);
      this.right[1] = Math.cos(this.rot);
    }
  }
};

module.exports = User;
