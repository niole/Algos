var ns = [6,8,9,5,3,6,75,4,30,0,22,1,4,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,8,9,9,0,0,0,1000,10];
var totalMachines = 7;

/**
 * how to distribute evenly on machines when have very skewed data
 * goal: previous machine always has data that is LTE to current machine's data
 */

function loadMachines(data, totalMachines) {
  var dataPerMachine = Math.ceil(data.length/totalMachines);
  var ms = [[]];

  var i=0;
  for (; i < data.length; i++) {
    if (i%dataPerMachine === dataPerMachine-1) {
      ms.push([]);
    }
    ms[ms.length-1].push(data[i]);
  }

  return ms;
}

var loaded = loadMachines(ns, totalMachines);

/**
 sort each partition, then, merge two and split in half back onto separate machines
  stop sorting after effectively merged  all partitions with each other
*/
