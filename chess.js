//n-queens?
//queen can go up, down, left, right, all diagonals

function placeQueens(n, boardSize) {
  if (n === 0) {
    var ys = [];
    var i;
    for (i=0; i < boardSize; i++) {
      ys.push([i]);
    }
    return ys;
  }

  var queens = placeQueens(n-1, boardSize);
  return queens.reduce(function(states, state) {
    var y;
    for (y=0; y < boardSize; y++) {
      var canPlace = isSafe(n, y, state);
      if (canPlace) {
        var nextState = state.concat([y]);
        states.push(nextState);
      }
    }
    return states;
  }, []);
}

function onDiag(x1, x2, y1, y2) {
  var yDiff = Math.abs(y1-y2);
  var xDiff = Math.abs(x1-x2);
  return (yDiff/xDiff) === 1;
}

function isSafe(x, y, state) {
  var i;
  for (i=0; i < state.length; i++) {
    if (state[i] === y || onDiag(x, i, y, state[i])) {
      return false;
    }
  }
  return true;
}

function getAllBoardStates(boardSize) {
  var p = placeQueens(boardSize-1, boardSize);
  console.log('total: ', p.length);
}

getAllBoardStates(8);

function print(queens) {
  var board = [];
  var x;
  for (x=0; x < queens.length; x++) {
    var queenY = queens[x];
    var y;
    var width = [];
    for (y=0; y < queens.length; y++) {
      if (y === queenY) {
        width.push("Q");
      } else {
        width.push("X");
      }
    }
    board.push(width);
  }
  console.log(board);
}
