var ancestry = JSON.parse(require('./ancestry.js'));

function average(array) {
    function plus(a, b) { return a + b; }
    return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
    byName[person.name] = person;
});

var labels = ancestry.filter(function (person) {
    return person.died;
}).map(function (person) {
    return (Math.ceil(person.died / 100).toString());
});

var ages =  ancestry.filter(function (person) {
    return person.died;
}).map(function (person) {
    return person.died - [person.born];
});

function groupBy(labels, ages) {
    var i = 0;
    var j = 0;
    var century = {}, data = {};
    //Set the first value in century
    //Use index (i) to access value of century[i].
    century[i] = labels[i];
    for (i in century) {
        //Compare that value to the value at every other index of label[i].
        if (century[i] == labels[i]) {
            for (j in labels) {
    	console.log(century[i])
                //If any match, use their index value to assign ages[j] to data[j].
              
                if (labels[j] == century[i]) {
                    data[j] = ages[j];
                    //console.log(data[j])
                }
            }

        }

    }
    return(century, data);
}

console.log(groupBy(labels, ages));