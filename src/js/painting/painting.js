'use strict';

function Painting() {
	this.setup();
	this.addListeners();
}

var proto = Painting.prototype;

proto.setup = function() {
	this.colorSwitchCount = 0;
	this.canvas = document.getElementById('canvas');
	this.update();
	this.ctx = this.canvas.getContext('2d');
	this.ctx.fillStyle = 'rgb(0, 0, 0)';
	this.ctx.fillRect(0, 0, this.width, this.height);
	// Bind listeners
	this.update = this.update.bind(this);
	this.onMousemove = this.onMousemove.bind(this);
	this.onMouseClick = this.onMouseClick.bind(this);
};

proto.addListeners = function() {
	window.addEventListener('resize', this.update);
	this.canvas.addEventListener('mousemove', this.onMousemove);
	this.canvas.addEventListener('click', this.onMouseClick);
};

proto.update = function() {
	this.width = window.innerWidth;
	this.height = window.innerHeight;
	this.canvas.width = this.width;
	this.canvas.height = this.height;
};

proto.onMousemove = function(e) {
	var rgbString;
	this.ctx.beginPath();
	this.ctx.arc(e.pageX, e.pageY, 20, 0, 2 * Math.PI, false);
	switch(this.colorSwitchCount) {
		case 0:
			rgbString = 'rgb(' + Math.floor((e.pageX/this.width)*255) + ', ' + Math.floor((e.pageY/this.height)*255) + ', 100)';
			break;
		case 1:
			rgbString = 'rgb(100, ' + Math.floor((e.pageX/this.width)*255) + ', ' + Math.floor((e.pageY/this.height)*255) + ')';
			break;
		case 2:
			rgbString = 'rgb(' + Math.floor((e.pageX/this.width)*255) + ', 100,' + Math.floor((e.pageY/this.height)*255) + ')';
			break;
		default:
			rgbString = 'rgb(' + Math.floor((e.pageX/this.width)*255) + ', ' + Math.floor((e.pageY/this.height)*255) + ', 100)';
	}
	this.ctx.fillStyle = rgbString;
	this.ctx.fill();
};

proto.onMouseClick = function(e) {
	this.colorSwitchCount = (this.colorSwitchCount + 1) % 3;
};

module.exports = Painting;
