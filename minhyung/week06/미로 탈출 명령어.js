// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/150365
// 시작날짜: 2023.11.17
// 시작시간: 23:05
// 종료시간: 24:41
// 소요시간: 01:36

// x,y -> r,c

// 격자 바깥으로는 못나감
// x,y -> r,c가 총 k여야 함.
// 모든 격자랑 두번 이상 방문해도 됨
// 탈출 경로를 문자열로 나타낼 때 사전순으로 가장 빠른 경로
// dfs로 탐색해도 될듯?

// n: 세로 길이
// m: 가로 길이
// x: 출발 행
// y: 출발 열
// r: 도착 행
// c: 도착 열
// k: 이동 거리
// d l r u

// 0. dfs로만 하니까 시간초과남
// 1. bfs로 일단 최단거리를 구함 (next 순서를 사전순으로 지정)
// 2. 만약 현재 dist가 k보다 작으면 여기부터 다시 dfs를 돌림
// 3. 두개 다 써도 시간초과됨 그리디로 풀어야하나?

// 일단 bfs로 해당 위치까지 가는건 맞을듯.
// 그러고서 k가 될 때 까지 다시 next를 반복함.
// 안되는 경우는 어떻게 판단??
// k가 짝수인데 도착했을 때 dist가 홀수이면 불가능
// k가 홀수인데 도착했을 떄 dist가 짝수이면 불가능
// (k-dist) % 2 === 1, 그리고 dist가 넘어가면
// 조건을 따지면 dfs로 될것같은데..
// 현재 위치에서 갈 수 없으면 탈출
// 더 우선순위가 높은 결과가 있으면 탈출

function solution(n, m, x, y, r, c, k) {
  const isInBoard = (y, x) => y >= 1 && y <= n && x >= 1 && x <= m;
  const next = [
    [1, 0, "d"],
    [0, -1, "l"],
    [0, 1, "r"],
    [-1, 0, "u"],
  ];
  const info = { y: x, x: y, dist: 0, path: "" };
  const dist = Math.abs(x - r) + Math.abs(y - c);
  let result = "z";

  if (dist > k || (k - dist) % 2 === 1) return "impossible";

  const dfs = (y, x, dist, path) => {
    if (dist + Math.abs(y - r) + Math.abs(x - c) > k) {
      return;
    }
    if (y === r && x === c && dist === k) {
      result = path;
      return;
    }
    for (const [yy, xx, str] of next) {
      const [ny, nx] = [y + yy, x + xx];
      if (!isInBoard(ny, nx) || path >= result) continue;

      dfs(ny, nx, dist + 1, path + str);
    }
  };

  dfs(x, y, 0, "");
  return result;
}
