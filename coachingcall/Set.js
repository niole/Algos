/*
 * implement a set like data structure with insert, remove, and GetRandomElement with equal probability per element
 */

function Set(ints) {
  this._ints = []; //this is going to be used in get random element
  this._hashmap = {}; //map from int to index in ints

  this._setInitialData(ints);
}
Set.prototype.constructor = Set;
Set.prototype.displayName = "Set";

Set.prototype._setInitialData = function(ints) {
  if (ints && ints.length) {
    var initialData = ints.reduce(function(initialData, nextInt) {
      if (typeof initialData._hashmap[nextInt] !== "number") {
        initialData._ints.push(nextInt);
        initialData._hashmap[nextInt] = initialData._ints.length-1;
      }
      return initialData;
    }, { _ints: [], _hashmap: {} });

    for (var key in initialData) {
      this[key] = initialData[key];
    }
  }
};

Set.prototype.contains = function(int) {
  return typeof this._hashmap[int] === "number";
};

Set.prototype.insert = function(int) {
  if (!this.contains(int)) {
    this._ints.push(int);
    this._hashmap[int] = this._ints.length-1;
  }
};

Set.prototype.remove = function(int) {
  if (this.contains(int)) {
    var index = this._hashmap[int];

    if (index < this._ints.length-1) {
      //overwrite element to delete in ints array
      //with end element
      //update index value of replacement in hashmap
      var replacement = this._ints.pop();
      this._ints[index] = replacement;
      this._hashmap[replacement] = index;
    } else {
      //element to delete is last element
      //pop from end of array
      this._ints.pop();
    }

    delete this._hashmap[int];
  }
};

Set.prototype.GetRandomElement = function() {
  //this get random element only works if we keep this.ints
  //maybe there's a way of doing this without ints and just an object
  var randomIndex = Math.floor(Math.random()*this._ints.length);
  return this._ints[randomIndex];
};

var s = new Set();
s.insert(1);
s.insert(3);
s.insert(6);
s.insert(8);

console.log('should have only 4 elements in Set: ', s._ints.length === 4 && Object.keys(s._hashmap).length === 4);
console.log('hashmap and ints array in sync: ', testHashMapandIntsInSync(s._hashmap, s._ints));

s.remove(3);

console.log('should have only 3 elements in Set: ', s._ints.length === 3 && Object.keys(s._hashmap).length === 3);
console.log('hashmap and ints array in sync: ', testHashMapandIntsInSync(s._hashmap, s._ints));
console.log('3 should not exist in Set: ', !testExistsInSet(s, 3));

var set = new Set([9,6,4,5,66,3,0,0]);

showProportionsGetRandomElement(set);

function showProportionsGetRandomElement(set) {
  var randomElements = [];
  for (var i=0; i < 1000; i++) {
    randomElements.push(set.GetRandomElement());
  }

  var hist = randomElements.reduce(function(acc, int, index) {
    if (acc[int]) {
      acc[int] += 1;
    } else {
      acc[int] = 1;
    }

    if (index === randomElements.length-1) {
      //iterate over keys and update with percents
      for (var k in acc) {
        acc[k] = (acc[k]/randomElements.length)*100;
      }
    }

    return acc;
  }, {});

  console.log(hist);
}

function testExistsInSet(set, int) {
  return set._ints.indexOf(int) > -1 && typeof set[int] === "number";
}

function testHashMapandIntsInSync(hm, ints) {
  for (var i=0; i < ints.length; i++) {
    var nextInt = hm[ints[i]];
    if (typeof nextInt !== "number") {
      return false;
    }
  }
  return true;
}
