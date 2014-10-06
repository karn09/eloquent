/*
A vector type:

Write a constructor Vector that represents a vector in two-dimensional space. It takes x and y parameters (numbers), which it should save to properties of the same name.

Give the Vector prototype two methods, plus and minus, that take another vector as a parameter and return a new vector that has the sum or difference of the two vectors’ (the one in this and the parameter) x and y values.

Add a getter property length to the prototype that computes the length of the vector—that is, the distance of the point (x, y) from the origin (0, 0).


HINT:
Your solution can follow the pattern of the Rabbit constructor from this chapter quite closely.

Adding a getter property to the constructor can be done with the Object.defineProperty function. To compute the distance from (0, 0) to (x, y), you can use the Pythagorean theorem, which says that the square of the distance we are looking for is equal to the square of the x coordinate plus the square of the y coordinate. Thus, √(x2 + y2) is the number you want, and Math.sqrt is the way you compute a square root in JavaScript.

*/


function Vector (x, y) {
	this.x = x;
	this.y = y;
}
Vector.prototype.plus = function(vector) {
	return new Vector(this.x + vector.x, this.y + vector.y)
}
Vector.prototype.minus = function(vector) {
	return new Vector(this.x - vector.x, this.y - vector.y)
}

Object.defineProperty(Vector.prototype, "length", {
	enumerable: false,
	get: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
});

console.log(new Vector(1, 2).plus(new Vector(2, 3)));
// → Vector{x: 3, y: 5}
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
// → Vector{x: -1, y: -1}
console.log(new Vector(3, 4).length);
// → 5