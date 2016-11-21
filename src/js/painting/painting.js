'use strict';

function Painting() {
	this.setup();
	this.addListeners();
}

var proto = Painting.prototype;

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
	this.ctx.beginPath();
	this.ctx.arc(e.pageX, e.pageY, 70, 0, 2 * Math.PI, false);
	var rgbString1 = 'rgb(' + Math.floor((e.pageX/this.width)*255) + ', ' + Math.floor((e.pageY/this.height)*255) + ', 100)';
	var rgbString2 = 'rgb(100, ' + Math.floor((e.pageX/this.width)*255) + ', ' + Math.floor((e.pageY/this.height)*255) + ')';
	var rgbString3 = 'rgb(' + Math.floor((e.pageX/this.width)*255) + ', 100,' + Math.floor((e.pageY/this.height)*255) + ')';
	this.ctx.fillStyle = rgbString1;
	this.ctx.fill();
};

module.exports = Painting;
