let p5Images = [];

let width = 320;
let height = 240;


let TextureStore = {};
TextureStore.get = function(textureID) {
  return p5Images[textureID];
};

// module.exports.TextureStore;
