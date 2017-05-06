const cfg = require('./config');
const mapping = cfg.colorToImageMap;
const user = require('./User');

/* 
 */
function Renderer3D() {}

/* 
 */
Renderer.prototype.init = function() {};

/* 
 */
Renderer.prototype.sampleTexture = function(texID, index) {};

/*
 */
Renderer.prototype.drawFloorAndCeiling = function() {};

/*
 */
Renderer.prototype.render = function() {};

module.exports = Renderer;
