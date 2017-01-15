
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

var r1 = minPointDistance(p1);

var p2 = makeData(10000, -50000, 50000);

var sq = getMinPair(p2);

console.log('sq', sq);

var r2 = minPointDistance(p2);
var r3 = minPointDistance(p2);
var r4 = minPointDistance(p2);
var r5 = minPointDistance(p2);

console.log('r2', r2);
console.log('r3', r3);
console.log('r4', r4);
console.log('r5', r5);

function pointDistance(p1, p2) {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

function sort(points) {
  return points.sort(function(a, b) {
    return a.x - b.x;
  });
}

function split(points) {
  if (points.length < 4) {
    //run get min
    return getMinPair(points);
  }

  var mid = Math.floor(points.length/2);

  var left = points.slice(0, mid);
  var right = points.slice(mid);

  var lMin = split(left);
  var rMin = split(right);

  var min = lMin.distance < rMin.distance ? lMin : rMin;

  //walk out from mid until you reach a point where xs are outside of smallest min distance
  var i = mid-1;
  var j = mid;

  while (i > 0 && j < points.length && Math.abs(points[i].x - points[j].x) < min.distance) {
    i--;
    j++;
  }

  var midPoints = points.slice(i, j+1);
  var mMin = getMinPair(midPoints);

  return mMin.distance < min.distance ? mMin : min;
}

function minPointDistance(points) {
  var sorted = sort(points);
  return split(points);

}

function getMinPair(points) {
  var minPair;
  var i=0;
  var j;
  var p1;
  var p2;
  var dist;

  for (; i < points.length-1; i++) {
    p1 = points[i];
    j = i+1;
    for (; j < points.length; j++) {
      p2 = points[j];

      if (!minPair) {
        minPair = {
          p1: p1,
          p2: p2,
          distance: pointDistance(p1, p2)
        };
      } else if (Math.abs(p1.x - p2.x) < minPair.distance) {
        //if going to find anything else

        dist = pointDistance(p1, p2);
        if (dist < minPair.distance) {
          minPair = {
            p1: p1,
            p2: p2,
            distance: pointDistance(p1, p2)
          };
        }
      } else {
        break;
      }

    }
  }

  return minPair;
}

