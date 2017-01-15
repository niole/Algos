/*
 * implement a HashSet
 * make value hashing function
 * make way of resolving collisions - linear probing
 * decide when to expand and when to shrink the HashSet's inner data structure
 */
function HashSet() {
  this._hashSet = Array(10); //array of values, polymorphic
  this._totalFull = 0;
}

HashSet.prototype.constructor = HashSet;

HashSet.prototype.totalFull = function() {
  return this._totalFull;
};

HashSet.prototype.size = function() {
  return this._hashSet.length;
};

HashSet.prototype._transferElements = function(newHashSet) {
  var that = this;
  var keyValue;

  this._hashSet.forEach(function(value) {
    if (value !== undefined) {
      keyValue = that._hashKey(value, newHashSet);
      newHashSet[keyValue.key] = keyValue.value;
    }
  });

  this._hashSet = newHashSet;
};

HashSet.prototype.string = function(value) {
  if (typeof value !== "string") {
    return JSON.stringify(value);
  }
  return value;
};

HashSet.prototype.remove = function(value) {
  var index = this._contains(value);

  if (index > -1) {
    this._hashSet[index] = undefined;
    this._totalFull -= 1;
  }

  this._resize();

};

HashSet.prototype._contains = function(value) {
  var stringified = this.string(value);
  var keyValue = this._hashKey(value);
  var key = keyValue.key;

  if (this._hashSet[key] === stringified) {
    return key;
  } else {
    //iterate over whole set and find it
    var size = this.size();
    var i = (key+1)%size;
    while (i !== key) {
      if (this._hashSet[i] === stringified) {
        return i;
      }
      i = (i+1) % size;
    }

    return -1;
  }
};

HashSet.prototype._resize = function() {
    var newHashSet;

    if (this._shouldMakeBigger()) {
      newHashSet = Array(this.size()*2);
    } else if (this._shouldMakeSmaller()) {
      newHashSet = Array(Math.ceil(this.size()/2)); //use ceil so that never have empty arrays
    }

    if (newHashSet) {
      this._transferElements(newHashSet);
    }
};

HashSet.prototype.contains = function(value) {
  return this._contains(value) > -1;
};

HashSet.prototype.add = function(newValue) {
  if (!this.contains(newValue)) {
    this._totalFull += 1;

    this._resize();

    var keyValue = this._hashKey(newValue);
    this._hashSet[keyValue.key] = keyValue.value;
  }
};

HashSet.prototype.linearProbe = function(key, hashSet) {
  var set = hashSet || this._hashSet;
  var size = hashSet ? hashSet.length : this.size();
  var i = key+1 % size;

  while (i !== key) {
    if (set[i] === undefined) {
      return i;
    }
    i = i+1 % size;
  }
};

HashSet.prototype._hashKey = function(value, hashSet) {
  var set = hashSet || this._hashSet;
  var size = hashSet ? hashSet.length : this.size();
  var code = value;
  var stringifiedValue = typeof value !== "string" ? JSON.stringify(value) : value;

  //every other case, stringify and turn into number value
  if (typeof value !== "number") {
    code = this._hashString(stringifiedValue);
  }

  var newKey = code % size;

  if (set[newKey] !== undefined) {
    newKey = this.linearProbe(newKey, hashSet);
  }

  return {
    key: newKey,
    value: stringifiedValue
  };
};

HashSet.prototype._shouldMakeBigger = function() {
  return this.totalFull()/this.size() > .5;
};

HashSet.prototype._shouldMakeSmaller = function() {
  return this.totalFull()/this.size() < .25;
};

HashSet.prototype._hashString = function(value) {
  var code = 0;
  var i=0;
  for (; i < value.length; i++) {
    code += value.charCodeAt(i);
  }

  return code;
};

var hs = new HashSet();

hs.add([1]);
hs.add([1]);
hs.add([7,8,2]);
hs.add([7,8,0]);
hs.add([9999999, 7,8,0]);

console.log(hs.totalFull() === 4);
console.log(hs.contains([1]) === true);
console.log(hs.contains([]) === false);

hs.add([2]);
hs.add([3]);
hs.add([4]);
hs.add([5]);

console.log('hs', hs);

hs.remove([2]);

console.log('hs', hs);

hs.remove([3]);
hs.remove([4]);
hs.remove([5]);

console.log('hs', hs.contains([3]) === false);
console.log('hs', hs.contains([4]) === false);
console.log('hs', hs.contains([5]) === false);

hs.remove([7,8,2]);
hs.remove([7,8,0]);
hs.remove([9999999, 7,8,0]);

