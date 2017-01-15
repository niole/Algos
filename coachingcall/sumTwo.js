function main(allIntegers, targetValue) {
  /*
   * maintain a hashmap of seen integers, maps from int to total of that int
   * everytime you see a new int, check map for other int that would sum to targetValue
   * if doens't exist, enter new value into map and keep going
   * if does exist, increment a count
   * when you have seen all of the integers, return the count
   */
    return hasSumToTarget(allIntegers, 0, targetValue, {});
}

function hasSumToTarget(allIntegers, index, targetValue, seen) {
  var firstInt = allIntegers[index];
  var secondInt = targetValue - firstInt;
  var hasSecondInt = seen[secondInt];

  if (index === allIntegers.length) {
    //if you made it this far, there is no sum
    return false;
  }

  if (typeof hasSecondInt === "number") {
      //there is a count associated with the int we're looking for
      return true;
  }

  //doesn't matter if you mutate seen, bc there is no backtracking involved
  if (!seen[firstInt]) {
    seen[firstInt] = 1;
  } else {
    seen[firstInt] += 1;
  }

  return hasSumToTarget(allIntegers, index+1, targetValue, seen);
}

//function sumToTarget(allIntegers, index, targetValue, seen, totalPairs) {
//  if (index === allIntegers.length) {
//    return totalPairs;
//  }
//
//  var firstInt = allIntegers[index];
//  var secondInt = targetValue - nextInt;
//  var hasSecondInt = seen[secondInt];
//  var updatedTotalPairs;
//
//  if (typeof hasSecondInt === "number") {
//      //there is a count associated with the int we're looking for
//      updatedTotalPairs = totalPairs + hasSecondInt;
//  } else {
//     updatedTotalPairs = totalPairs;
//  }
//
//  //doesn't matter if you mutate seen, bc there is no backtracking involved
//  if (!seen[firstInt]) {
//    seen[firstInt] = 1;
//  } else {
//    seen[firstInt] += 1;
//  }
//
//  return sumToTarget(allIntegers, index+1, targetValue, seen, updatedTotalPairs);
//}

// [5, 4, 2, 4], 8 --> true [5, 1, 2, 4], 8 --> false

console.log(main([5, 4, 2, 4], 8) === true);
console.log(main([5, 1, 2, 4], 8) === false);
