//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
1
AA+A+
1
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++]))();

function isOperator(str) {
  return ["*", "/", "+", "-"].some((operator) => operator === str);
}
function calculate(operand1, operand2, operator) {
  return {
    "*": operand1 * operand2,
    "/": operand1 / operand2,
    "+": operand1 + operand2,
    "-": operand1 - operand2,
  }[operator];
}
function solution(n, str, operands) {
  const operandObj = {};
  const stack = [];
  let operandIdx = 0;

  for (let i = 0; i < str.length; i++) {
    const nowStr = str[i];
    // 연산자면 스택에서 두개 빼서 연산함
    // 순서는 첫번째 pop이 뒤, 두번째 pop이 앞
    if (isOperator(nowStr)) {
      const right = stack.pop();
      const left = stack.pop();
      const result = calculate(left, right, nowStr);
      stack.push(result);
    }
    // 피연산자면 스택에 넣어둠
    else {
      // 만약 현재 피연산자의 숫자가 뭔지 모르면 알아둠
      if (!operandObj[nowStr]) {
        operandObj[nowStr] = operands[operandIdx++];
      }
      stack.push(operandObj[nowStr]);
    }
  }

  return stack[0].toFixed(2);
}

const N = +input();
const str = input();
const operands = Array.from({ length: N }, () => Number(input()));
console.log(solution(N, str, operands));
