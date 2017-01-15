var util = require('./util.js');

var getMoviesRatedByBoth = util.getMoviesRatedByBoth;
var compareAll = util.compareAll;


function getPearsonCorrelationCo(c1, c2) {
  //1: per pair, get all movies rated by both
  //2: per pair, add up all scores for all movies for each critic respectively
  //3: sum the squares of the prefs
  //4: sum the products of both critics scores per movie
  //5: Calculate Pearson score
  var sharedRatings = getMoviesRatedByBoth(c1, c2);
  var iterableRatings = Object.keys(sharedRatings);

  if (iterableRatings.length === 0) {
    return 0;
  }

  var sums = iterableRatings.reduce(function(accSums, movieTitle) {
    accSums.sum1 += c1[movieTitle];
    accSums.sum2 += c2[movieTitle];
    accSums.sqSum1 += Math.pow(c1[movieTitle], 2);
    accSums.sqSum2 += Math.pow(c2[movieTitle], 2);
    accSums.pSum += c1[movieTitle]*c2[movieTitle];
    return accSums;
  }, { sqSum1: 0, sqSum2: 0, pSum: 0, sum1: 0, sum2: 0 });

  return getPearsonScore(sums.pSum, sums.sqSum1, sums.sqSum2, sums.sum1, sums.sum2, iterableRatings.length);
}

function getPearsonScore(pSum, sqSum1, sqSum2, sum1, sum2, totalCommonRatedMovies) {
  var num = pSum - (sum1*sum2/totalCommonRatedMovies);
  var den = Math.sqrt(
    (sqSum1 - Math.pow(sum1,2)/totalCommonRatedMovies)*(sqSum2-Math.pow(sum2,2)/totalCommonRatedMovies)
  );

  if (den > 0) {
    return num/den;
  }
  return 0;
}

function getAllPearsonCo(ratings) {
  return compareAll(ratings, {}, function(allCo, c1, c2, i, j) {
      allCo[c1.critic+"|"+i+"|"+c2.critic+"|"+j] = getPearsonCorrelationCo(c1.movies, c2.movies);
      return allCo;
  });
}

module.exports = function pearsonCoefficientCalculator(ratings) {
  var pMap = getAllPearsonCo(ratings);
  var res = [];

  var key;
  for (key in pMap) {
    res.push({key: key, value: pMap[key]});
  }

  return res.sort(function(a, b) {
    return a.value - b.value;
  });
}
