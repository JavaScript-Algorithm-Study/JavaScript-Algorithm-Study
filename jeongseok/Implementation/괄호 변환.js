// 1. w를 u와 v로 분리
// 1-1. u는 균형잡힌 괄호 문자열로 더 이상 분리할 수 없어야함, v는 빈문자열 가능
// 1-2. u가 올바른 괄호 문자열이면 v에 대해 1단계부터

// 2. u가 올바른 괄호 문자열 아니라면
// 2-1. 빈 문자열에 "(" 붙임
// 2-2. v에 대해 1단계 재귀 적으로 결과를 붙임
// 2-3. ")"를 붙임
// 2-4. u의 첫 번째, 마지막 문자열 제거, 나머지 문자열의 괄호 뒤집어서 뒤에 붙임

function solution(p) {
  if (p === "") {
    return "";
  }

  const answer = recursive(p);

  return answer;
}

function recursive(p) {
  if (p === "") {
    return "";
  }

  let left = 0;
  let right = 0;

  for (let i = 0; i < p.length; i++) {
    if (p[i] === "(") {
      left += 1;
    } else {
      right += 1;
    }

    if (left === right) {
      // 올바른 괄호 문자열이라면
      if (isRightBracket(p.slice(0, i + 1))) {
        return p.slice(0, i + 1) + recursive(p.slice(i + 1));
      }
      // 균형잡힌 괄호 문자열이라면
      else {
        let str = "(" + recursive(p.slice(i + 1)) + ")";

        let tmpStr = "";
        // p.slice(0, i + 1)의 가장 앞과 가장 끝 제거
        for (let j = 1; j < i; j++) {
          if (p[j] === "(") {
            tmpStr += ")";
          } else {
            tmpStr += "(";
          }
        }

        return str + tmpStr;
      }
    }
  }
}

function isRightBracket(p) {
  const stack = [];

  for (let i = 0; i < p.length; i++) {
    if (p[i] === "(") {
      stack.push(p[i]);
    } else {
      if (stack.length === 0) {
        return false;
      }
      stack.pop();
    }
  }

  return true;
}
