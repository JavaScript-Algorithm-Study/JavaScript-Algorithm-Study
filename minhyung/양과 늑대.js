// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/92343
// 시작날짜: 2023.10.07
// 시작시간: 16:14
// 종료시간: 18:17중단.
// 소요시간: 02:03

function solution(info, edges) {
  const visit = Array(info.length).fill(false);
  const G = {};
  const memo = {};

  let result = 0;

  visit[0] = true;

  edges.forEach(([to, from]) => {
    G[to] = [...(G[to] || []), from];
    G[from] = [...(G[from] || []), to];
  });

  const dfs = (node, nexts, visit, sheep, wolf, state) => {
    if (memo[state]) return;
    memo[state] = true;

    if (info[node] === 0) sheep++;
    else wolf++;

    result = Math.max(sheep, result);

    if (sheep <= wolf) {
      return;
    }

    for (const next of nexts) {
      if (visit[next]) continue;
      visit[next] = true;

      const n = [...nexts, ...G[next].filter((node) => !visit[node])];
      dfs(next, n, visit, sheep, wolf, state | (1 << next));

      visit[next] = false;
    }
  };

  dfs(0, [...G[0]], visit, 0, 0, "0");

  return result;
}

const result = solution(
  [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
  [
    [0, 1],
    [1, 2],
    [1, 4],
    [0, 8],
    [8, 7],
    [9, 10],
    [9, 11],
    [4, 3],
    [6, 5],
    [4, 6],
    [8, 9],
  ]
);

console.log(result);
