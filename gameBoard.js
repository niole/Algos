function solution(A) {
    // write your code in JavaScript (Node.js 6.4.0)
    //find maximum value of all spots in a game where you roll a
    //six sided die to go from spot to spot
    var currPos = 0;
    var pathValue = A[0];
    console.log('A.length', A.length);

    while (currPos < A.length) {
        var nextState = getNextMove(currPos, A);
        pathValue += nextState[0];
        currPos = nextState[1];
    }

    return pathValue;
}

function getNextMove(currPos, A) {
    //pick max valued spot between currPos and 6 spaces
    //from currPos
    //if the last position in A is within 6 moves
    //since always have to pick last element, must pick
    //highest element before that
    var maxElt = -Infinity;
    if (currPos+6 < A.length-1) {
        //can grab anything
        var i=currPos+1;
        for(; i < currPos+7; i++) {
            maxElt = Math.max(maxElt, A[i]);
        }
        return [maxElt, currPos+7];
    } else if (currPos < A.length-1) {
        //be careful of end index
        var i=currPos+1;
        for(; i < A.length-1; i++) {
            maxElt = Math.max(maxElt, A[i]);
        }
        //deal with last element separately
        return [maxElt, A.length-1];
    } if (currPos === A.length-1) {
        return [A[A.length-1], A.length];
    }
}

var res = solution([1,1,2,3,3,3,3,2,2,1,1]);
console.log(res);
