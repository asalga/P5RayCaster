const kb = require('keyboardjs');

let Keys = {};

const RotSpeed = 1.85;
const WalkSpeed = 2;
const BoundingRadius = 1;

let pressed = function(e) {
  Keys[e.code] = true;
};
let released = function(e) {
  Keys[e.code] = false;
};

['left', 'right', 'up', 'down'].forEach(function(i) {
  kb.bind(i, pressed, released);
});

let User = {
  rot: 0,
  pos: [21, 7],
  dir: [1, 0],
  right: [0, 1],

  moveCharacter: function(doNegate, dt) {
    let [oldPosX, oldPosY] = this.pos;

    this.pos[0] += doNegate * this.dir[0] * WalkSpeed * dt;
    this.pos[1] += doNegate * this.dir[1] * WalkSpeed * dt;
    // if (worldMap[Math.floor(pos.x)][Math.floor(pos.y)] !== 0) {
    //   pos.x = oldPosX;
    //   pos.y = oldPosY;
    // }
  },

  update: function(dt) {
    let dirty = false;

    if (Keys.ArrowRight) {
      this.rot -= RotSpeed * dt;
      dirty = true;
    }
    if (Keys.ArrowLeft) {
      this.rot += RotSpeed * dt;
      dirty = true;
    }
    if (Keys.ArrowUp) {
      this.moveCharacter(1, dt);
      dirty = true;
    }
    if (Keys.ArrowDown) {
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
