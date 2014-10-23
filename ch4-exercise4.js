// Your code here.
var deepEqual = function(obj1, obj2) {
  // body...
  if (typeof obj1 == "object" && obj1 !== null) {

  }

};


var obj = {
  here: {
    is: "an"
  },
  object: 2
};

console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {
  here: 1,
  object: 2
}));
// → false
console.log(deepEqual(obj, {
  here: {
    is: "an"
  },
  object: 2
}));
// → true
