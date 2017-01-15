//find the min chars that can be deleted to get something that is a palindrome
//need:
//is palindrome check
//a way to delete characters and get new states
//a way to compare the number steps that it took to get to a goal state

function memoize(F) {
  var map = {};
  return function() {
    var args = JSON.stringify(arguments);

    if (!map[args]) {
      map[args] = F.apply(F, arguments);
    }
    return map[args];
  };
}

function isPalindrome(s) {
  var i=0;
  for (; i < s.length; i++) {
    //break out of loop when i >= s.length-i
    var oppositeIndex = s.length-i-1;
    if (i >= oppositeIndex) {
      //made it to the end
      return true
    }

    //check to see if chars the same
    if (s[i] !== s[oppositeIndex]) {
      return false;
    }
  }
}

isPalindrome = memoize(isPalindrome);

function allUnique(s) {
  var hashmap = {};
  var i=0;
  for (; i < s.length; i++) {
    if (hashmap[s[i]]) {
      return false;
    }
    hashmap[s[i]] = true;
  }
  return true;
}

function main(s) {
  //I think the original implementaton is upper bound n!
  var start = new Date().getTime();
  if (allUnique(s)) {
    return s.length-1;
  }
  var res = findMinSteps(s, 0, {});
  var end = new Date().getTime();
  console.log(end-start);
  return res.minPathLength;
}

function findMinSteps(s, pathLength, seen, currMin) {
  /*
   *
   */
  if (!seen[s]) {
    seen[s] = true;
  }

  if (pathLength > currMin) {
    return {
      minPathLength: currMin,
      seen: seen
    };
  }

  var sIsPalindrome = isPalindrome(s);
  if (sIsPalindrome || s.length === 1) {
    return {
      minPathLength: pathLength,
      seen: seen
    };
  }

  var nextStates = getStates(s, seen);
  var minPathLength = Infinity;
  var i=0;
  for (; i < nextStates.length; i++) {
    var nextState = nextStates[i];
    var res = findMinSteps(nextState, pathLength+1, seen, currMin);
    minPathLength = Math.min(minPathLength, res.minPathLength);
    seen = res.seen;
  }

  return {
    minPathLength: minPathLength,
    seen: seen
  };
}

function getStates(s, seen) {
  //delete one character at each new position
  //those are the states
  var nextStates = [];
  var i=0;
  for (; i < s.length; i++) {
    var nextState = s.slice(0, i) + s.slice(i+1);
    if (!seen[nextState]) {
      nextStates.push(nextState);
    }
  }
  return nextStates;
}


var s1 = "cattack";
var actual1 = main(s1);
var expected1 = 1;
console.log(expected1 == actual1);

var s2 = "sdddffjkfds";
var actual2 = main(s2);
var e2 = 4;
console.log(actual2 === e2);

var s3 = "knhsdf";
var actual3 = main(s3);
var e3 = 5;
console.log(actual3 === e3);

main("sdlfkjalnoiabnroifjasfjal;boaiher;fjaslkcaihefoaiserfasodfjlksahflksdjfhdk");
