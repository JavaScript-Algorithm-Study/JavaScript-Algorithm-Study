//https://www.acmicpc.net/problem/1918
// prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
A*(B+C)
`.trim().split('\n');

function isSame(compare, arr) {
  if (Array.isArray(arr)) {
    return arr.some((element) => element === compare);
  } else {
    return compare === arr;
  }
}

function popElementsWithCondition(arr, breakCondition) {
  let result = "";

  while (arr.length > 0) {
    if (isSame(arr.at(-1), "(")) break;
    if (breakCondition?.(arr.at(-1))) break;

    const pop = arr.pop();
    result += pop;
  }

  return result;
}

function popEveryElements(arr) {
  return popElementsWithCondition(arr);
}

function popElementsBeforeBrackeet(arr) {
  let result = "";

  while (arr.length > 0) {
    const pop = arr.pop();
    if (isSame(pop, "(")) break;
    result += pop;
  }

  return result;
}

function solution(string) {
  const stack = [];
  let result = "";

  for (const char of string) {
    if (isSame(char, ["(", "*", "/", "+", "-"])) {
      if (isSame(char, ["*", "/"])) {
        // stack의 마지막 요소가 + - 면 while문을 빠져나옴
        result += popElementsWithCondition(stack, (el) => isSame(el, ["+", "-"]));
      } else if (isSame(char, ["+", "-"])) {
        // stack의 모든 요소를 pop함
        result += popEveryElements(stack);
      }
      // 우선순위에 따라 stack에서 pop한후 현재 요소를 stack에 넣어줌
      stack.push(char);
    } else if (isSame(char, ")")) {
      result += popElementsBeforeBrackeet(stack);
    }
    // 문자열
    else {
      result += char;
    }
  }

  if (stack.length > 0) {
    result += popElementsBeforeBrackeet(stack);
  }
  return result;
}

console.log(solution(stdin[0]));

// [
//   ["A*(B+C)", "ABC+*"],
//   ["A+B", "AB+"],
//   ["A+B*C", "ABC*+"],
//   ["A+B*C-D/E", "ABC*+DE/-"],
//   ["(A+((B+C)+E))", "ABC+E++"],
//   ["A*B*C", "AB*C*"],
//   ["A+B+(C*D+E)", "AB+CD*E++"],
//   ["A+B*(C*D+E)", "ABCD*E+*+"],
// ].forEach(([input, answer]) => {
//   const result = solution(input);
//   if (result === answer) return;
//   console.log(`틀림\n  in     : ${input}\n  result : ${result}\n  correct: ${answer}`);
// });

// 문자열 스택, 기호 스택
// 만날 수 있는거

// (     : 스택에 넣음
// )     : ( 를 만날 때 까지 스택에서 빼서 결과에 추가함
// * /   : * / 만나기 전까지의 모든 요소를 스택에서 빼서 결과에 추가함
// + -   : + - 를 만나기 전까지 모든 요소를 스택에서 빼서 결과에 추가함
// 문자열  : 결과에 더함

// 마지막에 스택에 있는걸 결과에 추가해줌
