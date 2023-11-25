/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/60058
난이도 : Level 2

(의 개수와 )의 개수가 같다면 균형잡힌 괄호 문자열
괄호의 짝도 맞을 경우 올바른 괄호 문자열
균형잡힌 괄호 문자열을 올바른 괄호 문자열로 변환
1. 입력이 빈 문자열이면, 빈 문자열 반환
2. w를 두 균형잡힌 괄호 문자열  u, v로 분리 단 u는 균형잡힌 괄호 문자열로 분리할 수 없고, v는 빈 문자열이 될 수 있다.
3. u가 올바른 괄호 문자열이면 v에 대해 1단계부터 다시 수행
  3-1. 수행한 결과 문자열을 u에 이어 붙인 후 반환
4. 문자열 u가 올바른 괄호 문자열이 아니라면
  4-1. 빈 문자열에 첫 번째 문자로 (를 붙인다.
  4-2. 문자열 v에 대해 1단계부터 재귀적으로 수행한 결과 문자열을 이어 붙인다.
  4-3. )를 다시 붙인다.
  4-4. u의 첫번째와 마지막 문자를 제거하고, 나머지 문자열의 괄호 방향을 뒤집어 뒤에 붙인다.
  4-5. 생성된 문자열을 반환한다.
*/
const p = '()))((()';
function solution(p) {
  var answer = '';

  const check = (p) => {
    const arr = p.split('');
    const left = [];
    const right = [];

    for (let cur of arr) {
      if (cur === '(') left.push(cur);
      else {
        if (left.length > 0) left.pop();
        else right.push(cur);
      }
    }
    if (left.length === 0 && right.length === 0) return true;
    else return false;
  };

  const divide = (p) => {
    const arr = p.split('');
    let leftCnt = 0;
    let rightCnt = 0;
    let divePoint;

    for (let i = 0; i < arr.length; i++) {
      let cur = arr[i];

      if (cur === '(') leftCnt += 1;
      else rightCnt += 1;

      if (leftCnt !== 0 && rightCnt !== 0 && leftCnt === rightCnt) {
        divePoint = i + 1;
        break;
      }
    }

    return [p.slice(0, divePoint), p.slice(divePoint)];
  };

  const simulate = (p) => {
    if (p === '') return '';

    const [u, v] = divide(p);

    if (check(u)) {
      const result = u + simulate(v);
      return result;
    } else {
      const reverse = (u) => {
        return u
          .substr(1, u.length - 2)
          .split('')
          .map((v) => (v === ')' ? '(' : ')'))
          .join('');
      };

      const result = '('.concat(simulate(v)).concat(')') + reverse(u);
      return result;
    }
  };

  answer = simulate(p);

  return answer;
}
console.log(solution(p));
