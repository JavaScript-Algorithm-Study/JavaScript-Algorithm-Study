//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
A*(B+C)

`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++];})();

const isSumOperator = (str) => ["+", "-"].some((op) => op === str);
const isMulOperator = (str) => ["*", "/"].some((op) => op === str);
const priority = { "+": 3, "-": 3, "*": 2, "/": 2, "(": 1, ")": 1 };
function pop(stack, ord) {
  let poped = "";

  while (stack.length && stack.at(-1) !== "(" && priority[stack.at(-1)] <= ord) {
    poped += stack.pop();
  }
  return poped;
}
function solution(input) {
  let stack = [];
  let result = "";

  // + -: + -를 만날때까지 스택을 pop후 넣음 (우선순위 1)
  // * /: * /를 만날때까지 스택을 pop 후 넣음 (우선순위 2)
  // (  : 그냥 넣음
  // )  : (를 만날때까지 모두 pop함
  // 문자: 그냥 출력함
  for (const str of input) {
    if (isSumOperator(str)) {
      result += pop(stack, 3);
      stack.push(str);
    } else if (isMulOperator(str)) {
      result += pop(stack, 2);
      stack.push(str);
    } else if (str === "(") {
      stack.push(str);
    } else if (str === ")") {
      while (stack.length) {
        const front = stack.pop();
        if (front === "(") break;
        result += front;
      }
    } else {
      result += str;
    }
  }

  return (
    result +
    stack
      .filter((c) => c !== "(")
      .reverse()
      .join("")
  );
}

console.log(solution(input()));

// 연산자를 만나면 큐에 넣음
// (A+B)*(C-D)/E
// AB+CD-*E/
// (C*(F*(A+(B*C))-(D/E))
// CFABC*+**DE/-
