/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/81304
난이도 : Level4
*/
function solution(n, start, end, roads, traps) {
  const graph = Array.from({ length: n + 1 }, () => new Array());
  const reverseGraph = Array.from({ length: n + 1 }, () => new Array());

  for (let i = 0; i < roads.length; i++) {
    const [P, Q, S] = roads[i];
    graph[P].push([P, Q, S]);
    reverseGraph[Q].push([Q, P, S]);
  }

  const trapsVisitMap = new Map();
  for (let i = 0; i < traps.length; i++) {
    trapsVisitMap.set(traps[i], -1);
  }

  let isReverse = false;
  let time = new Array(n + 1).fill(0);
  let queue = graph[start];

  while (queue.length > 0) {
    const [prev, next, t] = queue.shift();

    if (next === start) continue;

    const nextTime = time[prev] + t;

    time[next] = nextTime;

    if (trapsVisitMap.has(next)) {
      const visitCnt = trapsVisitMap.get(next);
      if (visitCnt % 2 !== 0) {
        isReverse = !isReverse;
      } else if (visitCnt % 2 === 0) {
        isReverse = false;
      }
      trapsVisitMap.set(next, visitCnt + 1);
    }

    if (isReverse) {
      queue = reverseGraph[next];
    } else {
      queue = graph[next];
    }
  }

  return time[end];
}
