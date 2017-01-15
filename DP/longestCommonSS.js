/*
 * do canonical dp example
 */

function makeGrid(s1, s2) {
  var width = s1.length;
  var height = s2.length;
  var grid = [];
  var i;
  for (i=0; i < height; i++) {
    var w = [];
    var j;
    for (j=0; j < width; j++) {
      w.push(0);
    }
    grid.push(w);
  }
  return grid;
}

function getLongestSS(a, b, grid) {
  /*
   * if find equal chars, need to check to see if there are previous
   * substrings, so look up and to the left if possible, other wise just
   * to the left on current line
   *
   * a is the width
   * b is the height
   */
  var longest = 0;
  var i;
  for (i=0; i < a.length; i++) {
    var j;
    for (j=0; j < b.length; j++) {
      if (a[i] === b[j]) {
        //need to know if we can go up and left
        var canGoLeft = i > 0;
        if (j > 0) {
          //can go up
          if (canGoLeft) {
            //check diagonally up
            grid[j][i] = grid[j-1][i-1]+1;
          } else {
            //pull from above, if there were previous matches, should keep
            //same sub matches
            if (grid[j-1][i] > 0) {
              grid[j][i] = grid[j-1][i];
            } else {
              grid[j][i] = grid[j-1][i]+1;
            }
          }
        } else if (canGoLeft) {
          //can just go left
          grid[j][i] = grid[j][i-1]+1;
        } else {
          //at 0,0
          grid[j][i] += 1;
        }
      } else {
        //update longest if first non match
        //this will miss some things, like when a subsring match ends at the end of the string
        if (i > 0 && grid[j][i-1] > 0) {
          longest = Math.max(longest, grid[j][i-1]);
        }
      }
    }
  }
  console.log(longest);

  return grid;
}

var s2 = 'caterpillar';
var s1 = 'ocaterpr';

var g = makeGrid(s1, s2);
var res = getLongestSS(s1, s2, g);

print(s1, s2, res);

function print(s1, s2, grid) {
  var nextG = [[0].concat(s1.split(""))].concat(grid)
  for (var i=1; i < nextG.length; i++) {
    nextG[i] = [s2[i-1]].concat(nextG[i]);
  }
  console.log(nextG);
}
