/* jshint -W097 *//*global module, window, require */
'use strict';

var merge = require('lodash/merge');
var isElement = require('is-element');

/**
 * CanvasAnimation constructor description
 *
 * @class CanvasAnimation
 * @classdesc CanvasAnimation class description
 *
 * @param {object} options - Instance instantiation object
 * @param {string} options.example - Example options property
 */
function CanvasAnimation (wrapper, options) {
	this.elements = {};
	this.settings = {};
	this.properties = {};
	// Bindings
	this.createAndDraw = this.createAndDraw.bind(this);
	this.resetAndDraw = this.resetAndDraw.bind(this);
	this._setup(wrapper, options);
	this._setDimensions();
	this._addListeners();
	this.createAndDraw();
}

CanvasAnimation.DEFAULTS = {
	foregroundColors: ['#96CEB4', '#FFEEAD', '#FF6F69', '#FFCC5C', '#AAD8B0'],
	backgroundColors: ['#FF5335', '#B29C85', '#306E73', '#3B424C', '#1D181F'],
};

module.exports = CanvasAnimation;

/**
 * @function public
 * [description]
 * @param {number} tick - Description of tick parameter
 * @return {object} Description of returned value
 */
CanvasAnimation.prototype._setup = function(wrapper, options) {
	this.elements.wrapper = isElement(wrapper) ? wrapper : document.querySelector(wrapper);
	this.elements.canvas = this.elements.wrapper.querySelector('canvas');
	this.elements.ctx = this.elements.canvas.getContext('2d');
	this.settings = merge({}, CanvasAnimation.DEFAULTS, options || {});
	this.properties.canvasDimensions = {x: null, y: null};
	this.properties.shapePointsArray = [];
	this.properties.pointsLen = 0;
};;

CanvasAnimation.prototype._addListeners = function() {
	this.elements.wrapper.addEventListener('click', this.createAndDraw);
	window.addEventListener('resize', this.resetAndDraw);
};

CanvasAnimation.prototype._setDimensions = function() {
	this.properties.canvasDimensions.x = this.elements.wrapper.offsetWidth;
	this.properties.canvasDimensions.y = this.elements.wrapper.offsetHeight;
	this.elements.canvas.width = this.properties.canvasDimensions.x;
	this.elements.canvas.height = this.properties.canvasDimensions.y;
};

CanvasAnimation.prototype.resetAndDraw = function() {
	this._setDimensions();
	this.createAndDraw();
};

CanvasAnimation.prototype.createAndDraw = function() {
	this.createPointsArray();
	this.draw();
};

CanvasAnimation.prototype.createPointsArray = function() {
	var arrLength = Math.max(4, Math.floor(Math.random() * 60));
	this.properties.shapePointsArray = [];
	for (var i = 0; i < arrLength; i++) {
		var point = [];
		var x = Math.random() * this.properties.canvasDimensions.x;
		var y = Math.random() * this.properties.canvasDimensions.y;
		point.push(x);
		point.push(y);
		this.properties.shapePointsArray.push(point);
	}
};

CanvasAnimation.prototype.draw = function() {
	this.elements.ctx.clearRect(0, 0, this.elements.canvas.width, this.elements.canvas.height);
    this.elements.ctx.fillStyle = this.settings.backgroundColors[Math.floor(Math.random() * this.settings.backgroundColors.length)];
    this.elements.ctx.fillRect(0, 0, this.properties.canvasDimensions.x, this.properties.canvasDimensions.y);
    this.elements.ctx.beginPath();
    this.elements.ctx.moveTo(this.properties.shapePointsArray[0][0], this.properties.shapePointsArray[0][1]);
    for (var i = 0; i < this.properties.shapePointsArray.length; i++) {
		this.elements.ctx.lineTo(this.properties.shapePointsArray[i][0], this.properties.shapePointsArray[i][1]);
    }
    this.elements.ctx.fillStyle = this.settings.foregroundColors[Math.floor(Math.random() * this.settings.foregroundColors.length)];
    this.elements.ctx.fill();
};
