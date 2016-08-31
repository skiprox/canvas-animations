/**
 * CanvasAnimation mocha test spec - https://mochajs.org/
 * @param {Object} CanvasAnimation - CanvasAnimation unit tests
 */
describe('CanvasAnimation', function () {

	var canvasAnimation;

	beforeEach(function(){
		canvasAnimation = new CanvasAnimation(document.querySelector('.wrapper'));
	});

	it('should be a function', function () {
		assert.equal('function', typeof CanvasAnimation);
	});

	// Method test
	// describe('methodName', function () {
	// 	it('should exist as a function', function () {
	// 		assert.equal('function', typeof canvasAnimation.methodName);
	// 	});
	// 	it('should do what it is supposed to', function () {
	// 		canvasAnimation.methodName();
	// 		assert.equal(true, canvasAnimation.properties.someProperty);
	// 	});
	// });

});
