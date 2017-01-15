/*
 * have data structure which contains info like what have we seen up to this point
 * are they unique
 * as soon as you see a third unique character, that previous substring is checked for validity
 * then you start again with the part of the previous substring that, along with the
 * newest character and the process starts again
 * until you reach the end of the whole string
 *
 * must keep track of most recent substring of same chars in current
 * substring being looked at for 2 unique char property
 * */

var s1 = "abaaaghjkkjjkkojk";
var exp1 = 7;

var res1 = getUnique(s1, [], 0, 0, 0, 0);

console.log(res1 === exp1);

function getUnique(string, currChars, startCurrGuess, currIndex, startRecentSame, currentBest) {
  //currChars - [chr1, chr2]
  //currentBest - length of currently longest valid substring

  if (currIndex === string.length) {
    return currentBest-1;
  }

  var nextBest = currentBest + 1;
  var nextStartSame = startRecentSame;
  var nextStartCurrGuess = startCurrGuess;
  var nextCurrChars = currChars;

  var curr = string[currIndex];
  if (currChars.indexOf(curr) > -1) {
    //this is on of the current characters
    nextCurrChars = [string[startRecentSame], string[currIndex]];
  } else if (currChars.length === 2) {
    //it's time to update our substring and currentBest
    //update currChars correctly
    //nextBest may stay the same
    //nextStartSame will change
    nextBest = Math.max(currentBest, currIndex-startRecentSame);
    nextStartSame = currIndex;
    nextStartCurrGuess = startRecentSame;
    nextCurrChars = [string[startRecentSame], string[currIndex]];

  } else {
    //continue building on current guess
    //check if need to update startRecentSame
    //update currChars
    //update currentBest

    nextCurrChars = currChars.concat([curr]);

    if (string[startRecentSame] !== curr) {
      nextStartSame = currIndex;
    }
  }

  return getUnique(string, nextCurrChars, nextStartCurrGuess, currIndex+1, nextStartSame, nextBest);
}










