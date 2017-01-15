var A = "lalaland";
var B = "wizard of oz";
var C = "passengers";

var me = "me";
var ratings = [
  {critic: "a", movies: { [A]: 2, [B]: 5, [C]: 2.5 } },
  {critic: "b", movies: { [B]: 4.1, [C]: 2 } },
  {critic: "c", movies: { [A]: .9, [B]: 1.1, [C]: 4.9 } },
  {critic: "d", movies: { [A]: 3.3, [C]: 4.5 } },
  {critic: me, movies: { [B]: 5, [C]: 4.5 } },
];

module.exports = ratings;
