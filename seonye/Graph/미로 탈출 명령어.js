/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/150365
난이도 : Level3

1. 문제 설명
(x,y)에서 출발해서 (r,c)로 이동해서 탈출해야 한다.

1. 격자의 바깥으로 나갈 수 없다.
2. (x,y)에서 (r,c)까지 이동하는 거리가 총 k여야 한다.
    같은 격자 두 번 이상 방문해도 된다.
3. 미로에서 탈출한 경로를 문자열로 나타냈을때, 문자열이 사전 순으로 가장 빠른 경로로 탈출해야 한다.

이동 경로 : l, r, u, d

2. 풀이
백트래킹
시작 위치에서 k번 이동할 수 있는 모든 경우의 수에서 도착지점에 도달할 수 있는 경로를 구하고, 사전 순으로 정렬한다.
-> 시간초과, 사전순으로 방문하여 첫번째 경우가 정답이 된다.

k가 최단거리보다 작거나 최단거리로 도착하고 남은 이동횟수가 짝수가 아닌 경우 -> impossible
탐색 방향을 사전순으로 d,l,r,u로 지정하면 제일 처음 조건을 만족한 이동경로가 정답이 되므로 나머지 경우 return 해준다.
현재 위치에서 도착지점까지의 거리가 남은 이동횟수보다 크거나 같은 경우 dfs를 실행하지 않는다.

*/

function solution(n, m, x, y, r, c, k) {
  var answer = '';

  const dx = [1, 0, 0, -1];
  const dy = [0, -1, 1, 0];
  const dir = ['d', 'l', 'r', 'u'];
  const path = [];

  const dfs = (x, y, arr) => {
    if (path.length > 0) return;
    if (arr.length === k) {
      if (x === r && y === c) path.push(arr.join(''));
      return;
    }

    for (let i = 0; i < 4; i++) {
      let _x = x + dx[i];
      let _y = y + dy[i];
      let currDist = Math.abs(_x - r) + Math.abs(_y - c);

      if (_x < 1 || _x > n || _y < 1 || _y > m) continue;
      if (currDist >= k - arr.length) continue;

      dfs(_x, _y, [...arr, dir[i]]);
    }
  };

  const dist = Math.abs(x - r) + Math.abs(y - c);
  if (k - dist < 0 || (k - dist) % 2 !== 0) answer = 'impossible';
  else {
    dfs(x, y, []);
    answer = path[0];
  }

  return answer;
}
