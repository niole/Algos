var numberPat = /[0-9]+/i;
var s = "1 + (2 + 3) * (9 + (1 * 2))";
var ev = twoStack();
var output = ev(s, 0);
console.log(output);

function isLeftParen(x) {
  return x === "(";
}

function isRightParen(x) {
  return x === ")";
}

function isAdd(x) {
  return x === "+";
}

function isSubtract(x) {
  return x === "-";
}

function isDiv(x) {
  return x === "/";
}

function isMult(x) {
  return x === "*";
}

function isNumber(x) {
  return numberPat.test(x);
}

function isOp(x) {
  return isDiv(x) || isMult(x) || isAdd(x) || isSubtract(x);
}

function twoStack() {
  var opStack = [];
  var literalStack = [];

  return function evaluate(expression, index) {
    //expression - String
    console.log(opStack);
    console.log(literalStack);
    if (literalStack.length === 1) {
      return literalStack.pop();
    }

    var c = expression[index];

    if (isRightParen(c)) {
      //evaluate
      var n1 = parseInt(literalStack.pop());
      var n2 = parseInt(literalStack.pop());
      var op = opStack.pop();

      if (isAdd(op)) {
        literalStack.push(n1 + n2);
      }

      if (isMult(op)) {
        literalStack.push(n1 * n2);
      }
      if (isDiv(op)) {
        literalStack.push(n1 / n2);
      }
      if (isSubtract(op)) {
        literalStack.push(n1 - n2);
      }
    }

    if (isNumber(c)) {
      //add to literalStack
      literalStack.push(c);
    }

    if (isOp(c)) {
      opStack.push(c);
    }

    if (index === expression.length-1) {
      return evaluate(expression, index);
    }

    return evaluate(expression, index+1);
  }
}
