'use strict';

function Slide() {
	this.setup();
	this.addListeners();
}

var proto = Slide.prototype;

proto.setup = function() {
	this.canvas = document.getElementById('canvas');
	this.update();
	this.ctx = this.canvas.getContext('2d');
	this.ctx.fillStyle = 'rgb(0, 0, 0)';
	this.ctx.fillRect(0, 0, this.width, this.height);
	// Bind listeners
	this.update = this.update.bind(this);
	this.onMousemove = this.onMousemove.bind(this);
};

proto.addListeners = function() {
	window.addEventListener('resize', this.update);
	this.canvas.addEventListener('mousemove', this.onMousemove);
};

proto.update = function() {
	this.width = window.innerWidth;
	this.height = window.innerHeight;
	this.canvas.width = this.width;
	this.canvas.height = this.height;
};

proto.onMousemove = function(e) {
	this.draw(e.pageX, e.pageY);
};

proto.draw = function(x, y) {
	this.ctx.beginPath();
	this.ctx.rect(x, 0, 10, this.height);
	var rgbString1 = 'rgb(' + Math.floor((x/this.width)*255) + ', ' + Math.floor((y/this.height)*255) + ', 100)';
	var rgbString2 = 'rgb(100, ' + Math.floor((x/this.width)*255) + ', ' + Math.floor((y/this.height)*255) + ')';
	var rgbString3 = 'rgb(' + Math.floor((x/this.width)*255) + ', 100,' + Math.floor((y/this.height)*255) + ')';
	this.ctx.fillStyle = rgbString1;
	this.ctx.fill();
}

module.exports = Slide;
