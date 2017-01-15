//determine if a string has unique characters
var a = "asdf";
var b = "asdaf";

function hasUnique(s, index, hist) {
  if (index === s.length) {
    return true;
  }

  if (hist[s[index]]) {
    return false;
  }

  hist[s[index]] = true;
  return hasUnique(s, index + 1, hist);
}

console.log(hasUnique(a, 0, {}));
console.log(hasUnique(b, 0, {}));
