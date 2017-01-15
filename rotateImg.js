function createImg(width, height, img, last, isGeneric) {
  if (height === 0) {
    return img;
  }

  var nextWidth = [];
  for (var i=1; i<width+1; i++) {
    if (isGeneric) {
      nextWidth.push("x");
    } else {
      nextWidth.push(last);
      last += 1;
    }
  }

  img.push(nextWidth);
  return createImg(width, height-1, img, last, isGeneric);
}

function rotate(img, degrees) {
  if (degrees % 90) {
    //0 is falsey
    return false;
  }

  var mult = degrees/90;
  var nextImg = createImg(img[0].length, img.length, 0, [], true);

  //iterate over periphery and update all positions
  return updatePeriph(img, nextImg, { x: 0, y: 0 }, img.length, img[0].length, mult);
}

function updatePeriph(oldImg, newImg, startPos, height, width, mult) {
  //if (!height || !width) {
  //  return newImg;
  //}

  for (var x=startPos.x; x<startPos.x+width; x++) {
    for (var y=startPos.y; y<startPos.y+height; y++) {
      console.log('x', x);
      console.log('y', y);
      var nextPos = getNextPos(oldImg, mult, x, y);
      console.log('nextPos', nextPos);
      newImg[nextPos.y][nextPos.x] = oldImg[y][x]
    }
  }
  //var nextStartPos = {
  //  x: startPos.x+1,
  //  y: startPos.y+1
  //};

  //return updatePeriph(oldImg, newImg, nextStartPos, height-1, width-1, mult);
  return newImg;
}

function getNextPos(img, mult, x, y) {
  switch(mult) {
    case 0:
      return {
        x: x,
        y: y
      };
    case 1:
      return {
        x: img[0].length-1-y,
        y: x
      };
    case 2:
      return {
        x: x,
        y: img.length-1-y
      };
    case 3:
      return {
        x: img[0].length-1-y,
        y: x
      };
    default:
      break;
  }
}

var i1 = createImg(3, 3, [], 0);
var i2 = createImg(3, 3, [], 0);

var n = getNextPos(i1, 1, 0, 0);
var m = getNextPos(i1, 1, 1, 0);
var l = getNextPos(i2, 2, 1, 0);
var xx = getNextPos(i2, 2, 1, 1)
console.log(xx.x === 1);
console.log(xx.y === 1);
var goodX = l.x === 1;
var goodY = l.y === i2.length-1;
//console.log(goodY)
//console.log(goodX)


//console.log('n', n);
//console.log('x', n.x === i1[0].length-1);
//console.log('y', n.y === 0);
//console.log('mx', m.x === i1.length-1)
//console.log('my', m.y === 1)

//var r1 = rotate(i1, 90);
console.log('i1', i1);
//console.log('r1', r1);
//
//
