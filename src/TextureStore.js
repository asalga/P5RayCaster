window.TextureStore = {
  get: function(textureID) {
    return p5Images[textureID];
  }
};

module.exports = TextureStore;
