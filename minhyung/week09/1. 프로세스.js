// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/42587
// 시작날짜: 2024.01.05
// 시작시간: 18:20
// 종료시간: 18:34
// 소요시간: 00:14

// n이 100이라 간단하게 구현함
function solution(inputPriorities, location) {
  let runCnt = 0;
  const priorities = inputPriorities.map((priority, location) => ({
    priority,
    location,
  }));
  const order = inputPriorities.sort((a, b) => a - b);

  while (priorities.length > 0) {
    // 현재 우선순위와 priority가 같으면
    if (order.at(-1) === priorities[0].priority) {
      // 일단 실행함
      runCnt++;

      // location과 idx가 같다면 종료
      if (location === priorities[0].location) {
        return runCnt;
      }
      // 근데 다르면 다음걸 봐야함.
      else {
        order.pop();
        priorities.shift();
      }
    }
    // 현재 우선순위와 priority가 다르면 맨 뒤에 다시 넣어줌
    else {
      priorities.push(priorities.shift());
    }
  }
  return runCnt;
}
