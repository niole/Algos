function getKeyNames(key) {
  return key.split("|").filter(function(e) {
    return e !== "";
  });
}

function compareAll(toCompare, acc, cb) {
  var i=0;
  var j;
  for (; i < toCompare.length-1; i++) {
    j = i+1;
    for (; j < toCompare.length; j++) {
      acc = cb(acc, toCompare[i], toCompare[j], i, j);
    }
  }

  return acc;
}

function getMoviesRatedByBoth(c1, c2) {
  var sharedRatings = {};

  var key1;
  for (key1 in c1) {
    if (!sharedRatings[key1]) {
      if (typeof c2[key1] === "number") {
        sharedRatings[key1] = true;
      }
    }
  }

  var key2;
  for (key2 in c2) {
    if (!sharedRatings[key2]) {
      if (typeof c2[key1] === "number") {
        sharedRatings[key1] = true;
      }
    }
  }

  return sharedRatings;
}

module.exports = {
  getMoviesRatedByBoth: getMoviesRatedByBoth,
  compareAll: compareAll,
  getKeyNames: getKeyNames
};
