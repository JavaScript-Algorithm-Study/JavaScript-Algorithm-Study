// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/72413
// 시작날짜: 2023.11.18
// 시작시간: 22:45
// 종료시간: 23:02
// 소요시간: 00:17

// 1. S -> A -> B
// 2. S -> B -> A
// 3. S -> A
//    S -> B
// 4. S -> x -> B
//         x -> A

function solution(n, s, a, b, fares) {
  const G = Array.from({ length: n + 1 }, () =>
    Array.from({ length: n + 1 }, () => Infinity)
  );
  fares.forEach(([to, from, fare]) => {
    G[to][from] = fare;
    G[from][to] = fare;
  });

  for (let k = 1; k <= n; k++) {
    for (let a = 1; a <= n; a++) {
      for (let b = 1; b <= n; b++) {
        G[a][b] = Math.min(G[a][b], G[a][k] + G[k][b]);
      }
    }
  }

  let result = Infinity;

  const path1 = G[s][a] + G[a][b];
  const path2 = G[s][b] + G[b][a];
  const path3 = G[s][a] + G[s][b];

  for (let i = 1; i <= n; i++) {
    const path = G[s][i] + G[i][a] + G[i][b];
    result = Math.min(result, path);
  }

  return Math.min(result, path1, path2, path3);
}
