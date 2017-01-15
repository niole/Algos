/**
 * write a program that solves a slide puzzle
 * position of empty space
 * make next states by doing each possible slide move
 * have a done state
 * use a data structure that is fast to update and check equality with - array, stringified
 * come up with heuristic
 */

function SlidePuzzle(sideLength) {
  this._states = [ this._createBoard(sideLength) ]; //{ board: [], coords:, score:,}
  this._seen = {}; //set of stringified seen states, just boards
  this._sizeSeen = 0;
  this._sideLength = sideLength;
}

SlidePuzzle.prototype.constructor = SlidePuzzle;

SlidePuzzle.prototype.scoreMaximize = function(a, b, scorer) {
  var sa = a.score;
  var sb = b.score;

  if (!sa) {
    a.score = scorer(a.board);
    sa = a.score;
  }

  if (!sb) {
    b.score = scorer(b.board);
    sb = b.score;
  }

  return sa-sb;
};

SlidePuzzle.prototype.scoreMinimize = function(a, b, scorer) {
  var sa = a.score;
  var sb = b.score;

  if (!sa) {
    a.score = scorer(a.board);
    sa = a.score;
  }

  if (!sb) {
    b.score = scorer(b.board);
    sb = b.score;
  }

  return sb-sa;
};

SlidePuzzle.prototype.score = function(board) {
  var score = 0;
  var i = 0;
  for (; i < board.length; i++) {
    if (i === board[i]) {
      score += 1;
    }
  }
  return score;
};

SlidePuzzle.prototype.contigOrderScore = function(board) {
  //score is number of elements in order with element directly behind or in front of them
  var score = 0;
  var i = 0;
  for (; i < board.length-1; i++) {
    if (board[i+1] - board[i] === 1) {
      score += 1;
    }
  }
  return score;
};

SlidePuzzle.prototype.distScore = function(board) {
  //score is number of elements in order with element directly behind or in front of them
  var score = 0;
  var i = 0;

  for (; i < board.length; i++) {
    score += Math.abs(board[i] - i);
  }

  return score;
};

SlidePuzzle.prototype.side = function() {
  return this._sideLength;
};

SlidePuzzle.prototype.x = function(emptyIndex) {
  return emptyIndex % this.side();
};

SlidePuzzle.prototype.y = function(emptyIndex) {
  return Math.floor(emptyIndex/this.side());
};

SlidePuzzle.prototype.slideUp = function(state, emptyIndex) {
  return this.slide(
    state,
    emptyIndex,
    function(emptyIndex) {
      var inds = this.xy(emptyIndex);
      if (inds.y < this.side()-1) {
        return inds;
      }
    }.bind(this),
    function(emptyPos) {
      return (emptyPos.y+1)*this.side()+emptyPos.x;
    }.bind(this));
};

SlidePuzzle.prototype.slideDown = function(state, emptyIndex) {
  return this.slide(
    state,
    emptyIndex,
    function(emptyIndex) {
      var inds = this.xy(emptyIndex);
      if (inds.y > 0) {
        return inds;
      }
    }.bind(this),
    function(emptyPos) {
      return (emptyPos.y-1)*this.side()+emptyPos.x;
    }.bind(this));
};

SlidePuzzle.prototype.slide = function(state, emptyIndex, canSlide, getFullIndex) {
  var nextState = state.slice(0);
  var emptyPos = canSlide(emptyIndex);

  if (emptyPos) {
    var tmp;
    var fullIndex = getFullIndex(emptyPos);

    tmp = nextState[fullIndex];
    nextState[emptyIndex] = tmp;
    nextState[fullIndex] = 0;

    return {
      board: nextState,
      coords: fullIndex
    };
  }

};

SlidePuzzle.prototype.xy = function(emptyIndex) {
  return {
    x: this.x(emptyIndex),
    y: this.y(emptyIndex)
  };
};

SlidePuzzle.prototype.slideLeft = function(state, emptyIndex) {
  return this.slide(
    state,
    emptyIndex,
    function(emptyIndex) {
      var inds = this.xy(emptyIndex);
      if (inds.x < this.side()-1) {
        return inds;
      }
    }.bind(this),
    function(emptyPos) {
      var y = emptyPos.y*this.side();
      return emptyPos.x+1+y;
    }.bind(this));
};

SlidePuzzle.prototype.slideRight = function(state, emptyIndex) {
  return this.slide(
    state,
    emptyIndex,
    function(emptyIndex) {
      var inds = this.xy(emptyIndex);
      if (inds.x > 0) {
        return inds;
      }
    }.bind(this),
    function(emptyPos) {
      var y = emptyPos.y*this.side();
      return emptyPos.x-1+y;
    }.bind(this));
};

SlidePuzzle.prototype.seen = function(state) {
  if (typeof state !== "string") {
      return !!this._seen[JSON.stringify(state)];
  }

  return !!this._seen[state];
};

SlidePuzzle.prototype.addToSeen = function(state) {
  if (typeof state !== "string") {
    var s = JSON.stringify(state);
    if (!this._seen[s]) {
      this._seen[s] = true;
      this._sizeSeen += 1;
    }
  } else if (!this._seen[state]) {
    this._seen[state] = true;
    this._sizeSeen += 1;
  }

};

SlidePuzzle.prototype.isGoal = function(state) {
  if (state) {
    var i=0;
    for (; i < state.length; i++) {
      if (i !== state[i]) {
        return false;
      }
    }
    return true;
  }
  return false;
};

SlidePuzzle.prototype.getNextStates = function(board, coords) {
  var that = this;
  return [this.slideUp.bind(this), this.slideDown.bind(this), this.slideLeft.bind(this), this.slideRight.bind(this)]
    .reduce(function(states, getter) {
    var res = getter(board, coords);
    if (res && !that.seen(res.board)) {
      states.push(res);
    }
    return states;
  }, []);
};


SlidePuzzle.prototype.findGoal = function(scorer, totalTime, shouldMinimize) {
  var startTime = new Date().getTime();
  var that = this;
  var board;
  var currState;
  var coords;

  var state = this._states.pop();

  while (!this.isGoal(board)) {
    if (new Date().getTime()-startTime >= totalTime) {
      return board;
    }

    board = state.board;
    coords = state.coords;
    currState = JSON.stringify(board);

    this.addToSeen(currState);

    this._states = this._states.concat(this.getNextStates(board, coords))
      .sort(function(a, b) {
        if (shouldMinimize) {
          return that.scoreMinimize.call(that, a, b, scorer);
        }
        return that.scoreMaximize.call(that, a, b, scorer);
      });

    if (this._states.length) {

      state = this._states.pop();
      board = state.board;
      currState = JSON.stringify(board);

    } else {
      return board;
    }
  }

  return board;

};

SlidePuzzle.prototype._createBoard = function(sideLength) {
  var totalSquares = Math.pow(sideLength, 2);
  var board = Array(totalSquares);

  var i=0;
  var nextIndex;
  var _0Index;

  for (; i < board.length; i++) {
      nextIndex = this._getRandomCellIndex(board, i);
      board[nextIndex] = i;

      if (i === 0) {
        _0Index = nextIndex;
      }
  }

  return {
    board: board,
    coords: _0Index,
    score: this.score(board)
  };

};

SlidePuzzle.prototype._getRandomCellIndex = function(cells, number) {
  var nextIndex;

  while (true) {
    nextIndex = Math.floor(Math.random()*cells.length);
    if (typeof cells[nextIndex] !== "number") {
        return nextIndex;
    }
  }
};

var timeout = 2000;

var totalIterations = 100;

var itScore = 0;
var itContigScore = 0;
var distScore = 0;

var timeoutScore = 0;
var timeoutContigScore = 0;
var timeoutDistScore = 0;

var i=0;
for (; i < totalIterations; i++) {
  console.log(i);

  var p = new SlidePuzzle(3);
  var o = p.findGoal(p.score.bind(p), timeout);
  console.log("score", o);

  if (p.score(o) === Math.pow(p.side(), 2)) {
    itScore += p._sizeSeen;
  } else {
    timeoutScore += 1;
  }

  var x = new SlidePuzzle(3);
  var y = x.findGoal(x.contigOrderScore.bind(x), timeout);
  console.log("contigOrderScore", y);

  if (x.score(y) === Math.pow(x.side(), 2)) {
    itContigScore += x._sizeSeen;
  } else {
    timeoutContigScore += 1;
  }

  var k = new SlidePuzzle(3);
  var j = k.findGoal(k.distScore.bind(k), timeout, true);
  console.log("distScore", j);

  if (k.score(j) === Math.pow(k.side(), 2)) {
    distScore += k._sizeSeen;
  } else {
    timeoutDistScore += 1;
  }

}

console.log('iteration score avg: ', itScore/totalIterations);
console.log('itContigScore avg: ', itContigScore/totalIterations);
console.log('distScore: ', distScore/totalIterations);

console.log("timeoutScore avg: ", timeoutScore/totalIterations);
console.log('timeoutContigScore avg: ', timeoutContigScore/totalIterations);
console.log("timeoutDistScore", timeoutDistScore/totalIterations);

