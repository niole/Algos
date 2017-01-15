var s = 'asdffjkll';

/*
  non terminal
  {
    children: {
      ...letter edges...
    }
  }

  terminal
  {
    index: [end index of substring]
  }

   every index is the start of a new substring
   and maybe part of a current substring
   if a substring totally overlaps another, save indexes in array?

   create new start of substring for each letter and
   follow indexes until you get to the one right before the one you're at and
   then add current
 */

function addNode(s, i, trie) {
  var curr = s[i];
  for (var edge in trie) {
    var next = trie[edge];
    if (typeof next.index === "number" && next.index+1 === i) {
      //add to end of substring

    }
  }
}

