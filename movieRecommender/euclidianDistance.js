var util = require('./util.js');

var getMoviesRatedByBoth = util.getMoviesRatedByBoth;
var compareAll = util.compareAll;

function getDistance(c1, c2) {
  var sharedRatings = getMoviesRatedByBoth(c1, c2);
  var dist = 0;

  var key;
  for (key in sharedRatings) {
    dist += Math.abs(c1[key] - c2[key]);
  }

  return dist;
}

function compareAllCritics(ratings) {
 return compareAll(ratings, [], function(acc, c1, c2, i, j) {
      acc.push({ key: c1.critic+"|"+i+"|"+c2.critic+"|"+j, value: getDistance(c1.movies, c2.movies) });
      return acc;
  }).sort(function(a, b) {
    return a.value - b.value;
  });
}

function normalizeDist(comparedRatings) {
  //get decimal of diff between highest and lowest
  //closest is 1, farthest is -1
  var last = comparedRatings.length-1;
  var low = comparedRatings[0].value;
  var high  = comparedRatings[last].value;

  return comparedRatings.map(function(r) {
    return { key: r.key, value: normed(high, low, r.value) };
  });
}

function normed(high, low, score) {
  if (score === high) {
    return -1;
  }

  if (score === low) {
    return 1;
  }

  var diff = Math.abs(high - low);

  //diff -> 2
  return -1 + (2/diff);
}

module.exports = function pearsonCoefficientCalculator(ratings) {
  return normalizeDist(compareAllCritics(ratings)).sort(function(a,b) {
    return a.value - b.value;
  });
};
