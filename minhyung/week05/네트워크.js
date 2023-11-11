// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/72412
// 시작날짜: 2023.11.11
// 시작시간: 13:12
// 종료시간: 13:20
// 소요시간: 00:08

// 그래프를 dfs로 탐색함
// visited로 방문여부 판단함.
// 방문하지 않았던 노드만 방문하며
// 처음 시작점이 방문하지 않았다면 ( 다른 그래프에 이어져 있지 않으면) result ++

function solution(n, computers) {
  const visited = Array(n).fill(false);
  let result = 0;

  const dfs = (now) => {
    if (visited[now]) {
      return;
    }
    visited[now] = true;

    for (let i = 0; i < n; i++) {
      const next = computers[now][i];

      if (now === i || next === 0) {
        continue;
      }

      dfs(i);
    }
  };

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      result++;
    }
    dfs(i);
  }

  return result;
}
