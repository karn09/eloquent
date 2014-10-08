/*
Sequence interface

Design an interface that abstracts iteration over a collection of values. An object that provides this interface represents a sequence, and the interface must somehow make it possible for code that uses such an object to iterate over the sequence, looking at the element values it is made up of and having some way to find out when the end of the sequence is reached.

When you have specified your interface, try to write a function logFive that takes a sequence object and calls console.log on its first five elements—or fewer, if the sequence has fewer than five elements.

Then implement an object type ArraySeq that wraps an array and allows iteration over the array using the interface you designed. Implement another object type RangeSeq that iterates over a range of integers (taking from and to arguments to its constructor) instead.



One way to solve this is to give the sequence objects state, meaning their properties are changed in the process of using them. You could store a counter that indicates how far the sequence object has advanced.

Your interface will need to expose at least a way to get the next element and to find out whether the iteration has reached the end of the sequence yet. It is tempting to roll these into one method, next, which returns null or undefined when the sequence is at its end. But now you have a problem when a sequence actually contains null. So a separate method (or getter property) to find out whether the end has been reached is probably preferable.

Another solution is to avoid changing state in the object. You can expose a method for getting the current element (without advancing any counter) and another for getting a new sequence that represents the remaining elements after the current one (or a special value if the end of the sequence is reached). This is quite elegant—a sequence value will “stay itself” even after it is used and can thus be shared with other code without worrying about what might happen to it. It is, unfortunately, also somewhat inefficient in a language like JavaScript because it involves creating a lot of objects during iteration.

*/

/**
 * console.log first five values of supplied sequence
 * @param  {array} sequence will hold values supplied 
 * @return {log}          console.log first 5 iterations of sequence
 */
function logFive(sequence) {
    for (var i = 0; i < 5; i++) {
        if (!sequence.next()) {
            break;
        } else {
            console.log(sequence.current());
        }
    }
};

/**
 * ArraySeq constructor function
 * @param {array} array hold supplied array
 */
function ArraySeq(array) {
	// initialize array position
    this.pos = -1;
    // hold array for prototype
    this.array = array;
};
/**
 * ArraySeq prototype, holds next(), current()
 * @type {Object}
 */
ArraySeq.prototype = {
	/**
	 * iterate array forward once, while making sure that does not go over array.length
	 * @return {Boolean} check to see whether next iteration in array exists, if so, return true (and pos++), else false
	 */
    next: function() {
        if (this.pos >= this.array.length - 1) {
            //		console.log(this.pos >= this.array.length -1)
            return false;
        } else {
            this.pos++;
            //		console.log(this.pos)
            return true;
        }
    },
    /**
     * return the current location of the array
     * @return {number} array[position]
     */
    current: function() {
        return this.array[this.pos];
    }
};

/**
 * Constructor to hold sequence of numbers suppled
 * @param {number} from starting point of sequence
 * @param {number} to   end point of sequence
 */
function RangeSeq(from, to) {
    // this.from = from -1; so that when counter starts, i = from
    this.from = from - 1;
    this.to = to;
};

/**
 * prototype for RangeSeq, holds next/current functions
 * @type {Object}
 */
RangeSeq.prototype = {
	/**
	 * compare this.from to this.to, making sure iterator does not go outside bounds
	 * @return {boolean} return true if within range of sequence (and from++), else false and stops
	 */
    next: function() {
        if (this.from >= this.to) {
            return false;
        } else {
        	this.from++;
        	return true;
        }
    },
  	/**
  	 * return current location of sequence iterator
  	 * @return {number} will show current number at location
  	 */
    current: function() {
    	return this.from;
    }
};




logFive(new ArraySeq([1, 2]));
// → 1
// → 2
logFive(new RangeSeq(100, 1000));
// → 100
// → 101
// → 102
// → 103
// → 104