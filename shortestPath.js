/*
 * adjacency matrix:
 * assuming that nodes are enumerated from 0 - n-1 for n nodes
 * max one edge per node pair
 * find shortest path between specified nodes
 * paths that don't exist are of length 0
 * nodes are the indexes on width and height
 * return -1 if no path found
 */

var m = [[1,2,0], [5,2,1],[4,1,1]];
var e1 = 2;
var e2 = 0;
var expected = 3;
var actual = findPath(e1, e2, m);

console.log(actual === expected);

function findPath(e1, e2, graph) {
  //explore all paths
  var minPath1 = getNextStates(e1, e2, 0, graph, {});
  var minPath2 = getNextStates(e2, e1, 0, graph, {});

  return [minPath1, minPath2].reduce(function(min, path) {
    if (path === -1) {
      return min;
    }
    return Math.min(min, path);
  }, Infinity);
}

function cloneObject(obj) {
  var nextObject = {};
  for (var k in obj) {
    nextObject[k] = obj[k];
  }
  return nextObject;
}

function getNextStates(nextNode, target, pathLength, graph, seen) {
  //nextNode - Int, graph - Array[Array[Int]], seen - Set[Int -> Boolean]
  //return [] if no states
  if (nextNode === target) {
    return pathLength;
  }

  var i=0;
  var minPathLength = -1;

  for (; i < graph.length; i++) {
    //next states are possibly every node from 0 to graph.length-1
    //only if not yet seen
    seen[nextNode] = true
    var nextPathLength = graph[nextNode][i];

    if (!seen[i] && nextPathLength > 0) {
      //if there is a path length and haven't investigated this node yet
      var returnedPathLength = getNextStates(i, target, pathLength + nextPathLength, graph, cloneObject(seen));
      if (returnedPathLength > -1) {
        //was successful
        if (minPathLength > -1) {
          minPathLength = Math.min(returnedPathLength, minPathLength);
        } else {
          minPathLength = returnedPathLength;
        }
      }
    }
  }

  return minPathLength;
}
