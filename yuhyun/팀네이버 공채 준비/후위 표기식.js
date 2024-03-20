const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '예제.txt';
const input = fs.readFileSync(path).toString().trim().split('');

function solution(equation) {
  return 후위_표기식(equation).join('');

  function 후위_표기식(equation) {
    if (equation.length === 3) {
      const [operand1, operator, operand2] = equation;
      return [[operand1, operand2, operator].join('')];
    }

    const withoutParenthesis = [];
    for (let index = 0; index < equation.length; index += 1) {
      const item = equation[index];
      if (item !== '(') {
        withoutParenthesis.push(item);
        continue;
      }

      const rightPairIndex = findRightPairIndex(index, equation);
      withoutParenthesis.push(...후위_표기식(equation.slice(index + 1, rightPairIndex)));
      index = rightPairIndex;
    }

    const withoutMultipleAndDivide = [];
    for (let index = 0; index < withoutParenthesis.length; index += 1) {
      const item = withoutParenthesis[index];
      if (item === '*' || item === '/') {
        const operand1 = withoutMultipleAndDivide.pop();
        const operand2 = withoutParenthesis[index + 1];
        withoutMultipleAndDivide.push(후위_표기식([operand1, item, operand2]));
        index = index + 1;
        continue;
      }

      withoutMultipleAndDivide.push(item);
    }

    const result = [];
    for (let index = 0; index < withoutMultipleAndDivide.length; index += 1) {
      const item = withoutMultipleAndDivide[index];
      if (item === '+' || item === '-') {
        const operand1 = result.pop();
        const operand2 = withoutMultipleAndDivide[index + 1];
        result.push(후위_표기식([operand1, item, operand2]));
        index = index + 1;
        continue;
      }

      result.push(item);
    }

    return result;
  }

  function findRightPairIndex(start, equation) {
    let nLeft = 0;
    for (let index = start; index < equation.length; index += 1) {
      const item = equation[index];
      switch (item) {
        case '(':
          nLeft += 1;
          break;
        case ')':
          nLeft -= 1;
          if (nLeft === 0) {
            return index;
          }
          break;
      }
    }
    return -1;
  }
}

console.log(solution(input));
