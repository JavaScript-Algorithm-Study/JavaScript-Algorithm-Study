// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/49189
// 시작날짜: 2023.11.18
// 시작시간: 22:05
// 종료시간: 22:43
// 소요시간: 00:38

function solution(n, edge) {
  const G = Array.from({ length: n + 1 }, () => []);
  const visited = Array(n + 1).fill(false);
  const dist = [0, 1];
  const q = [1];

  edge.forEach(([from, to]) => {
    G[from].push(to);
    G[to].push(from);
  });
  visited[1] = true;

  while (q.length) {
    const now = q.shift();

    for (const next of G[now]) {
      if (visited[next]) continue;
      visited[next] = true;

      dist[next] = dist[now] + 1;
      q.push(next);
    }
  }

  const max = Math.max(...dist);
  return dist.filter((v) => v === max).length;
}
