// 지점 수, 출발 지점, a 도착지점, b 도착지점, 요금
function solution(n, s, a, b, fares) {
  const arr = Array.from(Array(n + 1), () => Array(n + 1).fill(30000000));

  for (let i = 1; i < n + 1; i++) {
    arr[i][i] = 0;
  }

  for (let i = 0; i < fares.length; i++) {
    const [x, y, cost] = fares[i];
    arr[x][y] = cost;
    arr[y][x] = cost;
  }

  for (let k = 1; k < n + 1; k++) {
    for (let i = 1; i < n + 1; i++) {
      for (let j = 1; j < n + 1; j++) {
        arr[i][j] = Math.min(arr[i][j], arr[i][k] + arr[k][j]);
      }
    }
  }

  let minCost = 30000000;

  for (let i = 1; i < n + 1; i++) {
    minCost = Math.min(minCost, arr[s][i] + arr[i][a] + arr[i][b]);
  }

  return minCost;
}
