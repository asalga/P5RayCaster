const cfg = require('./config');
const mapping = cfg.colorToImageMap;
const user = require('./User');

/* 
 */
function Renderer3D() {}

/* 
 */
Renderer3D.prototype.init = function() {};

/* 
 */
Renderer3D.prototype.sampleTexture = function(texID, index) {};

/*
 */
Renderer3D.prototype.drawFloorAndCeiling = function() {};

/*
 */
Renderer3D.prototype.render = function() {};

module.exports = Renderer3D;
