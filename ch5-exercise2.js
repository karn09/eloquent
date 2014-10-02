// load and parse ancestry.js into a JSON object
var ancestry = JSON.parse(require('./ancestry.js'));

/**
 * average of supplied array
 * @param  {[type]} array [description]
 * @return {[type]}       [description]
 */	
function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var byName = {};


var hasKnownMother = function(person) {
	return byName[person.mother] != null;
};

var difference = function(person) {
	return person.born - byName[person.mother].born;
};



ancestry.forEach(function(person) {
  byName[person.name] = person;
});

console.log(average(ancestry.filter(hasKnownMother).map(difference)))
