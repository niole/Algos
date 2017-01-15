
function getPerms(S, index, soFar) {
  //call starting with index 1
  //and soFar holding the first element of S
  if (index === S.length) {
    return soFar;
  }

  var nextChr = S[index];

  //iterate over soFar and generate new perms
  //which you will put on nextPerms
  //and then pass along with next call
  var nextPerms = soFar.reduce(function(acc, p) {
    //insert nextChr at every position in p
    //and then merge into acc
    var toMerge = [];

    for (var i=0; i<p.length; i++) {
      //for each of these indexes, push an updated
      //copy of p onto toMerge
      if (i === 0) {
        //insert before AND after
        toMerge.push(nextChr+p);
        toMerge.push(p.slice(0,1)+nextChr+p.slice(1));
      } else {
        //insert after always
        toMerge.push(p.slice(0,i+1)+nextChr+p.slice(i+1));
      }
    }

    acc = acc.concat(toMerge);
    return acc;
  }, []);

  return getPerms(S, index+1, nextPerms);
}


var c = 'cat';
var d = 'dorothy';
var res1 = getPerms(c, 1, [c[0]]);
console.log('d', getPerms(d, 1, [d[0]]))
var expected1 = {
  cat: true,
  cta: true,
  atc: true,
  act: true,
  tac: true,
  tca: true
};

function checkPerms(found, expected) {
  var accountedFor = found.reduce(function(map, next) {
    delete map[next];
    return map;
  }, expected);
  console.log(!Object.keys(accountedFor).length);
}

checkPerms(res1, expected1);
