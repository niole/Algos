var graph = {
    a: {
      z: 2,
    },
    b: {
      a: 4,
      d: 4,
      x: 2
    },
    c: {
      b: 10,
      a: 5,
      d: 7
    },
    d: {
      b: 1,
      x: 4
    },
    x: {
      b: 2
    },
    z: {
      d: 4,
      a: 1
    }
}

var s = allShortestPaths(graph, "a", {});

console.log(s);

function allShortestPaths(graph, startNode, shortestPaths) {
  /*
   * get shortest path to each node from start node
   * go in each direction once from each node
   * have own seen map for each direction
   * keep track of shortest paths in a map
   * iterate over keys at each node
   *
   * seen is seen while on this particular path, so a new seen map per
   * direction
   */

  //return getShortestPaths(graph, startNode, {}, shortestPaths, 0);
  return getClosestTwoPoints(graph, ["a", "b", "c", "d", "z", "x"]);

}

function clone(object) {
  var o = {};

  var k;
  for (k in object) {
    o[k] = object[k];
  }

  return o;
}

function getClosestTwoPoints(graph, allNodes) {
  return allNodes.reduce(function(shortestPair, node) {
      console.log(shortestPair);
      var shortest = getShortestPaths(graph, node, {}, {}, 0);
      var n;
      for (n in shortest) {
          if (shortest[n] < shortestPair.dist) {
            shortestPair.dist = shortest[n];
            shortestPair.pair = node + n;
          }
      }

      return shortestPair;
  }, { pair: null, dist: Infinity });
}

function getShortestPaths(graph, currNode, seen, shortestPaths, lengthCurrPath) {
  seen[currNode] = true;
  var nextNodes = graph[currNode];

  var node;
  for (node in nextNodes) {
    if (!seen[node]) {
      //update nodes
      var nextPath = lengthCurrPath + nextNodes[node];
      if (typeof shortestPaths[node] === "number") {
        shortestPaths[node] = Math.min(shortestPaths[node], nextPath);
      } else {
        shortestPaths[node] = nextPath;
      }

      //update shortestPaths
      shortestPaths = getShortestPaths(graph, node, clone(seen), shortestPaths, nextPath);
    }
  }

  //if made it this far, at dead end, return shortestPaths
  return shortestPaths;
}
