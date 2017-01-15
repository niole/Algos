////find min in rotated sorted list

function goalTest(A, mid) {
  return A[mid-1] > A[mid];
}

function getMid(end, start) {
  return start + Math.floor((end - start)/2);
}

function getMidTest(n, start, end) {
  if (n === 0) {
    return;
  }

  if (start > end) {
    console.log('start > end', start > end);
    console.log('start', start);
    console.log('end', end);
  }

  var mid = getMid(end, start);
  console.log('mid', mid);
  getMidTest(n-1, start, mid);
  getMidTest(n-1, mid, end);
}

function findGoal(A, start, end, currMax) {
  var mid = getMid(end, start);

  if (goalTest(A, mid)) {
    return mid;
  }

  if (A[mid] < currMax) {
    //go left
    return findGoal(A, start, mid, currMax);
  }

  //go right
  return findGoal(A, mid, end, Math.max(currMax, A[mid]));
}

//////normal binary search

function binarySearch(A, start, end, goal) {
  var mid = getMid(end, start);
  var curr = A[mid];
  if (goal === curr) {
    return mid;
  }

  if (curr > goal) {
    //go left
    return binarySearch(A, start, mid, goal);
  }

  if (curr < goal) {
    //go right
    return binarySearch(A, mid, end, goal);
  }
}

/////// rotate list

function getNewIndex(currIndex, degrees, length) {
  return (currIndex + degrees) % length;
}

function rotateList(A, degrees) {
  var rotatedList = [];
  A.forEach(function(a, index) {
    rotatedList[getNewIndex(index, degrees, A.length)] = a;
  });
  return rotatedList;
}

var x = 0;
var expected = 0;
var len = 5;
var degrees = 5;

var res4 = getNewIndex(x, degrees, len);
console.log('res4', res4 === expected);

var res5 = getNewIndex(1, degrees, len);
console.log('res5', res5 === 1);

var res6 = getNewIndex(1, 3, len);

console.log('res6', res6 === 4);

var a = [1,5,66,76,99,99,100];
var b = [100, 1,5,66,76,99,99];

var res = binarySearch(a, 0, a.length, 100);
var res2 = findGoal(b, 0, b.length, b[0]);
var res3 = rotateList(a, a.length);
var res7 = rotateList(b, 4);
console.log('res7', res7);

console.log('res2 is element 1', res2 === 1);
console.log('res is a.length-1', res === a.length-1);
console.log('res3 should be unit', res3[0] === a[0]);
console.log('res7 should be by 4', res7[4] === b[0]);
