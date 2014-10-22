/* 
 * Chapter 6 - Table Cells Program description
 * 
 * we will write a program that, given an array of arrays of table cells,
 * builds up a string that contains a nicely laid out table—meaning that the
 * columns are straight and the rows are aligned. Something like this:
 *
 *       name         height country
 *       ------------ ------ -------------
 *       Kilimanjaro    5895 Tanzania
 *       Everest        8848 Nepal
 *       Mount Fuji     3776 Japan
 *       Mont Blanc     4808 Italy/France
 *       Vaalserberg     323 Netherlands
 *       Denali         6168 United States
 *       Popocatepetl   5465 Mexico
 *
 * The way our table-building system will work is that the builder function
 * will ask each cell how wide and high it wants to be and then use this
 * information to determine the width of the columns and the height of the
 * rows. The builder function will then ask the cells to draw themselves at
 * the correct size and assemble the results into a single string.
 *
 * The layout program will communicate with the cell objects through a
 * well-defined interface. That way, the types of cells that the program
 * supports is not fixed in advance. We can add new cell styles later—for
 * example, underlined cells for table headers—and if they support our
 * interface, they will just work, without requiring changes to the layout
 * program.
 *
 * The first part of the program computes arrays of minimum column widths and
 * row heights for a grid of cells. The rows variable will hold an array of
 * arrays, with each inner array representing a row of cells.
 *
 * Using a variable name starting with an underscore (_) or consisting
 * entirely of a single underscore is a way to indicate (to human readers)
 * that this argument is not going to be used.
 */

var mountains = require('./mountains.js'); // Import local JSON

/**
 * rowHeights 
 * 
 *
 */

function rowHeights(rows) {
  return rows.map(function(row) {
    return row.reduce(function(max, cell) {
      return Math.max(max, cell.minHeight());
    }, 0);
  });
}

function colWidths(rows) {
  return rows[0].map(function(_, i) {
    return rows.reduce(function(max, row) {
      return Math.max(max, row[i].minWidth());
    }, 0);
  });
}

function drawTable(rows) {
  var heights = rowHeights(rows);
  var widths = colWidths(rows);

  function drawLine(blocks, lineNo) {
    return blocks.map(function(block) {
      return block[lineNo];
    }).join(" ");
}

function drawRow(row, rowNum) {
  var blocks = row.map(function(cell, colNum) {
    return cell.draw(widths[colNum], heights[rowNum]);
  	});
  return blocks[0].map(function(_, lineNo) {
    return drawLine(blocks, lineNo);
  	}).join("\n");
  }

  return rows.map(drawRow).join("\n");
}

/**
 * repeat
 *
 * Returns a string repeated some number of times
 *
 * repeat("x",3); // "xxx"
 */


function repeat(string, times) {
  var result = "";
  for (var i = 0; i < times; i++)
    result += string;
  return result;
}

/**
 * TextCell object constructor
 *
 * Uses the string.split method to cut the string into an array at every
 * occurence of the provided argument and places it in the text property.
 *
 * var example = new TextCell("This\nwould\nbe\nfive\nvalues");
 *
 * { text: [ 'This', 'would', 'be', 'five', 'values' ] }
 */

function TextCell(text) {
  this.text = text.split("\n");
}

/**
 * minWidth() returns a number indicating this cell’s minimum width (in
 * characters).
 *
 * Uses the length property of each string in the array (via .reduce) to find
 * the minimum width needed to display all the characters for each string in
 * the array (i.e. the maximum length)
 */

TextCell.prototype.minWidth = function() {
  return this.text.reduce(function(width, line) {
    return Math.max(width, line.length);
  }, 0); // 0 does not need to be specified, but it is?
};

/**
 * minHeight() returns a number indicating the minimum height this cell
 * requires (in lines).
 *
 * The number of lines needed for this string is represented by the text
 * array. Each string is one line, so the length of the array is the height.
 */

TextCell.prototype.minHeight = function() {
  return this.text.length;
};

/**
 * draw(width, height) returns an array of length height, which contains a
 * series of strings that are each width characters wide. This represents the
 * content of the cell.
 */

TextCell.prototype.draw = function(width, height) {
  var result = []; //empty array
  for (var i = 0; i < height; i++) { // iterate height # of times (i.e. length)
    var line = this.text[i] || ""; //put contents of string into line, or ""
    result.push(line + repeat(" ", width - line.length)); 
  } 
  // adds string then concatenates with the repeat function and adds spaces to
  // the end of the string, using the width of the cell minus the characters 
  // taken up by the original string
  // width = 10, string = "fudge", result = "fudge     "
  // This is then added to the result array via push
  return result;
};



// Original dataTable import statement, updated later

/*function dataTable(data) {
  var keys = Object.keys(data[0]);
  var headers = keys.map(function(name) {
    return new UnderlinedCell(new TextCell(name));
  });
  var body = data.map(function(row) {
    return keys.map(function(name) {
      return new TextCell(String(row[name]));
    });
  });
  return [headers].concat(body);
}*/

/**
 * UnderlinedCell prototype
 */

function UnderlinedCell(inner) {
  this.inner = inner;
};

UnderlinedCell.prototype.minWidth = function() {
  return this.inner.minWidth();
};

UnderlinedCell.prototype.minHeight = function() {
  return this.inner.minHeight() + 1; // make room for underline
};

UnderlinedCell.prototype.draw = function(width, height) {
  return this.inner.draw(width, height - 1)
    .concat([repeat("-", width)]); 
    //create a two lined cell, fill the second element of the array with spaces
};

/**
 * RTextCell - right-aligned text cell
 * constructor
 */

function RTextCell(text) {
  TextCell.call(this, text);
}

// copy prototype from TextCell
RTextCell.prototype = Object.create(TextCell.prototype);

RTextCell.prototype.draw = function(width, height) {
  var result = [];
  for (var i = 0; i < height; i++) {
    var line = this.text[i] || "";
    result.push(repeat(" ", width - line.length) + line);
  } // Same as TextCell draw, but puts the spaces first
  return result;
};



function dataTable(data) {
  var keys = Object.keys(data[0]); // takes in all the prop names of first cell
  var headers = keys.map(function(name) { //send prop names to map them
    return new UnderlinedCell(new TextCell(name)); 
  }); // map them to new Underline cells
  // headers is now:
  // { inner: { text: [ 'name' ] } 
  // { inner: { text: [ 'height' ] } 
  // { inner: { text: [ 'country' ] }}
  var body = data.map(function(row) {
    return keys.map(function(name) {
      var value = row[name]; // Call each property in data 
      // (i.e. row[name] = data[0].name, or "Kilmanjaro")
      // This was changed:
      //console.log(value);
      if (typeof value == "number") // if a number
        return new RTextCell(String(value)); // right justify
      else
        return new TextCell(String(value)); // else left justify
    });
  });
  return [headers].concat(body);
}

console.log(drawTable(dataTable(mountains)));

/*
name         height country      
------------ ------ -------------
Kilimanjaro    5895 Tanzania     
Everest        8848 Nepal        
Mount Fuji     3776 Japan        
Mont Blanc     4808 Italy/France 
Vaalserberg     323 Netherlands  
Denali         6168 United States
Popocatepetl   5465 Mexico  
*/ 


/*
Another cell

Implement a cell type named StretchCell(inner, width, height) that conforms to the table cell 
interface described earlier in the chapter. It should wrap another cell (like UnderlinedCell does)
and ensure that the resulting cell has at least the given width and height, even if the inner cell
would naturally be smaller.

Hints

You’ll have to store all three constructor arguments in the instance object. The minWidth and minHeight 
methods should call through to the corresponding methods in the inner cell but ensure that no number less 
than the given size is returned (possibly using Math.max).

Don’t forget to add a draw method that simply forwards the call to the inner cell.
*/
StretchCell.prototype.minWidth = function () {
  
}

StretchCell.prototype.minHeight = function () {
  
}

StretchCell.prototype.draw = function () {
    
}


var sc = new StretchCell(new TextCell("abc"), 1, 2);
console.log(sc.minWidth());
// → 3
console.log(sc.minHeight());
// → 2
console.log(sc.draw(3, 2));
// → ["abc", "   "]