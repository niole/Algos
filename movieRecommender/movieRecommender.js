var ratings = require('./ratings.js');
var pearsonCoefficientCalculator = require('./pearsonCoefficientCalculator.js');
var euclidianDistance = require('./euclidianDistance.js');
var util = require('./util.js');

var getKeyNames = util.getKeyNames;
var numPatt = /[0-9]+/;

var euRatings = euclidianDistance(ratings);
var pRatings = pearsonCoefficientCalculator(ratings);

var es = movieRecs(ratings, euRatings);
var ps = movieRecs(ratings, pRatings);

console.log('es', es);
console.log('ps', ps);

function movieRecs(ratings, coefficients) {
  var recommender = coefficients.filter(function(co) {
    return co.key.indexOf("me") > -1;
  }).sort(function(a, b) {
    if (b.value > a.value) {
      return -1;
    }

    if (b.value < a.value) {
      return 1;
    }

    return 0;
  })[0];

  var keyNames = getKeyNames(recommender.key);

  var recName = keyNames.filter(function(name) {
    return name !== "me" && !numPatt.test(name);
  })[0];

  var recRatings = ratings.find(function(r) {
    return r.critic === recName;
  });

  var weightRatings = [];

  var key;
  for (key in recRatings.movies) {
    weightRatings.push({
      title: key,
      score: recRatings.movies[key]*recommender.value
    });
  }

  return weightRatings;
}
