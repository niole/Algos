/**
 *
 * get N most similar data points to particular data point not in N^2 time
 *
 * sort by x, and then by y, then walk out from target point's position
 */


var p1 = [
  { x: 0, y: 1},
  { x: 5, y: 3},
  { x: 10, y: 31},
  { x: 9, y: 8},
  { x: 99, y: 28},
  { x: 30, y: 22},
  { x: 1, y: 1},
  { x: 5, y: 0}
];

var p2 = makeData(10000, -50000, 50000);

var r2 = getNClosest(p2, 10);
console.log(r2);
console.log(graphPoints(r2.points, r2.target));

function graphPoints(points, target) {
  var last = points.length-1;
  var minX = points[0].x;
  var minY = points[0].y;
  var maxX = points[last].x;
  var maxY = points[last].y;

  var graph = [];

  var x = 0;
  for (; x < Math.abs(maxX-minX); x++) {
    var width = [];
    var y = 0;
    for (; y < Math.abs(maxY-minY); y++) {
      width.push("o");
    }
    graph.push(width);
  }

  console.log(graph.length)
  console.log(graph[0].length)


  points.forEach(function(p) {
    var normX = Math.abs(p.x - minX);
    var normY = Math.abs(p.y - minY);
    console.log('normX', normX);
    graph[normX][normY] = "x";
  });

  return graph;
}

function getNClosest(points, n) {
  var index = Math.floor(Math.random()*points.length);
  var target = points[index];
  var sorted = sort(points, target);

  return {
    points: sorted.slice(0, n),
    target: target
  };
}

function randInRange(lb, ub) {
  var length = Math.abs(ub - lb);
  return lb + Math.floor(Math.random()*length);
}

function makeData(length, lb, ub) {
  var d = [];

  var i=0;
  for (; i < length; i++) {
    d.push({
      x: randInRange(lb, ub),
      y: randInRange(lb, ub)
    });
  }

  return d;
};

function pointDistance(p1, p2) {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

function sort(points, target) {
  //sort by distance to target, easy
  return points.sort(function(a, b) {
    var aDist = pointDistance(a, target);
    var bDist = pointDistance(b, target);
    return aDist - bDist;
  });
}


