function solution(A) {
    // write your code in JavaScript (Node.js 6.4.0)
    var sorted = A.sort(compare);
    var i=0;
    var nextOther;
    var min;
    for (; i < sorted.length; i++) {
        nextOther = getOther(sorted, i, 0, sorted.length, Infinity);
        if (min === undefined) {
            min = nextOther;
        } else {
            min = Math.min(min, nextOther);
        }
    }
    return min;
}
var A = [ -18, -12, -10, -8, -5, -4 ];
var e = 8;
var a = solution(A);
console.log(a === e);

function getOther(A, targetIndex) {
    //use binary search to find value that minimizes
    //target value
    var start = 0;
    var end = A.length;
    var min = Infinity;

    while ((end-start) > 2) {
      //how to decide which direction to go?
      var mid = Math.floor((end-start)/2);

      if (mid === targetIndex) {
          if (mid < end) {
              mid += 1;
          } else if (mid > start) {
              mid -= 1;
          }
      }

      var M = A[mid];
      var target = A[targetIndex];
      var nextMin = Math.abs(target + M);
      var updatedMin = Math.min(min, nextMin);

      if (target > 0) {
        //always go left unless
        //nextMin is larger than min
        //then go right
        if (nextMin > min) {
          //go right
          min = updatedMin;
          start = mid+1;
        } else {
          //go left
          min = updatedMin;
          end = mid;
        }
      } else if (target <= 0) {
        //always go right
        //if nextMin is greater than min
        //go left
        if (nextMin > min) {
          //go left
          min = updatedMin;
          end = mid;
        } else {
          //go right
          min = updatedMin;
          start = mid+1;
        }
      }
    }

    if ((end-start) <= 2) {
        //check last few values and then return min
        var i=start;
        for (; i < end; i++) {
            min = Math.min(min, Math.abs(A[targetIndex]+A[i]));
        }
        return min;
    }
}

function compare(a, b) {
    return a-b;
}

function mergesort(A) {
  var UB = Math.floor(A.length/2);
  var size = 2;
  while (size <= UB) {
    var i=0;
    for(; i < A.length; i+=size) {
      //split subsection in half and do merge step
      //size will always be even
      var j=i;
      var secStart;
      for (; j < i+size/2; j++) {
        secStart =
      }
    }
  }
}

function split(A, start, end) {
  if (end - start >= 1) {
    return [start];
  }
  var mid = Math.floor((end-start)/2);
  var lefts = split(A, start, mid);
  var rights = split(A, mid, end);

  //merge left and right indexes according to element values
  var i=0;
  var j=0;
  
}

function merge(s1, e1, s2, e2) {
}
