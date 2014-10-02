/**
* Iterate through provided array and determine whether every value passes provided test.
* @param  {array} array array of values passed in.
* @param  {function} test  function passed in providing test to run on array
* @return {boolean}       true value if all values within array pass test.
*/
var every = function (array, test) {
	for (var i = 0; i < array.length; i++ ){
		if (!test(array[i])) {
			return false;
		}
	}
	return true;
};

/**
 * Iterate through provided array and determine whether SOME values will pass provided test
 * @param  {array} array provided values in array datatype
 * @param  {function} test  funciton passed in to provide test ran on array
 * @return {boolean}       true value if ANY of the values within array pass the test. 
 */
var some = function (array, test) {
	for (var i = 0; i < array.length; i++) {
		if (test(array[i])) {
			return true;
		}
	}
	return false;
}

console.log(every([NaN, NaN, NaN], isNaN));
// → true
console.log(every([NaN, NaN, 4], isNaN));
// → false
console.log(some([NaN, 3, 4], isNaN));
// → true
console.log(some([2, 3, 4], isNaN));
// → false