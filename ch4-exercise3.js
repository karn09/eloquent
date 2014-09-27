// Your code here.

var arrayToList = function(array) {
  var list = null;
  for (var i = array.length - 1; i >= 0; i--) {
    list = {
      value: array[i],
      next: list
    };
  }
  return list;
};

var listToArray = function(list) {
  var array = [];
  for (var node = list; node; node = node.next) {
    array.push(node.value);
  }
  return array;
};

var prepend = function(value, list) {
  return {
    value: value,
    next: list
  };
};

var nth = function(list, n) {
  if (n === 0) {
    return list.value;
  } else {
    return nth(list.next, n - 1);
  }
};

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
