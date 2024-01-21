/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/42578
난이도 : Level 2

종류가 각각 a1, a2, a3 ... 개 만큼 있다고 했을때, 해당 종류의 옷을 입지 않은 경우의 수 1을 더해서
(a1 + 1)*(a2 + 1)*(a3 + 1)*...를 계산하고 모든 종류의 옷을 입지 않은 경우의 수 인 1을 빼서 정답을 구한다.
*/

function solution(clothes) {
  var answer = 1;

  const clothesMap = new Map();

  for (let i = 0; i < clothes.length; i++) {
    const [name, type] = clothes[i];
    if (!clothesMap.has(type)) clothesMap.set(type, [name]);
    else {
      clothesMap.get(type).push(name);
    }
  }

  for (const key of clothesMap.keys()) {
    answer *= clothesMap.get(key).length + 1;
  }

  return answer - 1;
}
