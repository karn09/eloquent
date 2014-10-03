// load and parse ancestry.js into a JSON object
var ancestry = JSON.parse(require('./ancestry.js'));


function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

/** CENTURIES
 * will return array of centuries each person belongs to
 * using Math.ceil(person.died / 100)
 * @param  {object} person ancestry array passed in to map function
 * @return {array} transformed array into centuries each person died within.
 *                             [20, 20, 18, 18, 20, 19, 16, .. , ..]
 */
var centuries = ancestry.map (function(person) {
	return Math.ceil(person.died / 100);
})

/** GROUPEDCENTURIES
 * run reduce on centuries array, store within grouped centuries. reduce will return reversed order.
 * @param  {object} a initial value of array
 * @param  {object} b secondary value of array
 * @return {array}   reduced array to only unique values
 *                           ex: [17, 21, 16, 19, 18, 20]
 */
var groupedCenturies = centuries.reduce(function (a, b) {
	
	if (a.indexOf(b) < 0) a.push(b);
	return a;
}, []);

// reverse centuries array
groupedCenturies.reverse()


/** AGES
 * return new array with ages of each person in ancestry json object
 * @param  {object} person iterate through ancestry object, pass into person
 * @return {array} age of each individual in person object
 *                     [73, 80, 41, 34, 90, 72, 47, 94, .. , ..]
 */
var ages = ancestry.map(function(person) {
	return person.died - person.born;
});

/**
 * ageGroupedByCentury, calls groupings function as passed in param1, and matches it to centuries function called
 * @param  {function} groupings        calls zip function to combine two arrays
 * @param  {function} groupedCenturies calls function to reduce initial centuries array into non-duplicate array
 * @return {object}                  centuries now mapped to average age
 */
var ageGroupedByCentury = function(groupings, groupedCenturies) {
	var result = {};
	for (var i = 0; i < groupedCenturies.length; i++){
		var temp = [];
		for (var j = 0; j < groupings.length; j++) {
			if(groupings[j][0] === groupedCenturies[i]) {
				temp.push(groupings[j][1])
			}
		}
		var currentCentury = groupedCenturies[i];
		var avg = average(temp).toFixed(1);
		result[currentCentury] = avg;
	}
	return result;
};

//magic from underscore library- takes two arrays and combines into one, 
// [[0,1],[1,2]]
function zip() {
    var args = [].slice.call(arguments);
    var shortest = args.length==0 ? [] : args.reduce(function(a,b){
        return a.length<b.length ? a : b
    });

    return shortest.map(function(_,i){
        return args.map(function(array){return array[i]})
    });
}

/**
 * call zip function, passing as arguments centuries and ages, store in groupings
 * @type {array}
 */
var groupings = zip(centuries, ages)


console.log(ageGroupedByCentury(groupings, groupedCenturies));


// Your code here.

// → 16: 43.5
//   17: 51.2
//   18: 52.8
//   19: 54.8
//   20: 84.7
//   21: 94