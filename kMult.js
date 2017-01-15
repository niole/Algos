/**
 * karatsuba multiplication
 */


function multiply(left, right) {
  //this currently only works for even sized arrays that are the same length
  console.log('arguments', arguments);

  if (left.length === 1 && right.length === 1) {
    return left[0]*right[0];
  }

  var ml = Math.ceil(left.length/2);
  var mr = Math.ceil(right.length/2);

  var l1 = left.slice(0, ml);
  var l2 = left.slice(ml);

  var r1 = right.slice(0, mr);
  var r2 = right.slice(mr);

  var A = multiply(l1, r1);//multiply both first halves
  var D = multiply(l2, r2);//multiply both second halves

  var lenData = left.length;

  return A*Math.pow(10, lenData) + (multiply(l1, r2)+multiply(l2, r1)) * Math.pow(10, ml) + D;
}

function number(n) {
  return typeof n === "number";
}

function add(left, right) {
  var n1 = Number(left.join(""));
  var n2 = Number(right.join(""));
  return n1+n2;
}

function getData(n) {
  return n.split("").map(function(str) {
    return Number(str);
  });
};

var orig = "3141592653589793238462643383279502884197169399375105820974944592"
var s1 = getData(orig);
var s2 = getData("2718281828459045235360287471352662497757247093699959574966967627");

var res = multiply(s1, s2);

console.log('res', res);
console.log('res', res.toPrecision());
var s = "";
for (var i=0; i < (126-15); i++) {
  s += "0";
}
console.log(res.toString() + s);
console.log('res', res);
var r = 8539734222673570;
console.log(r+s);


//var res2 = multiply([5,7,9,3,2,4], [9,9,9,9,9,5]);
//console.log('res2', res2);
//console.log(res2 === 579321103380);
