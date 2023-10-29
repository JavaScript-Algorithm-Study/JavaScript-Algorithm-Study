// dp[i] = dp[i][j-1] + dp[i-1][j]

function solution(m, n, puddles) {
  let arr = Array.from(Array(n), () => Array(m).fill(0));
  arr[0][0] = 1;

  for (let i = 0; i < puddles.length; i++) {
    arr[puddles[i][1] - 1][puddles[i][0] - 1] = -1;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (i === 0 && j === 0) {
        continue;
      }

      if (arr[i][j] === -1) {
        arr[i][j] = 0;
      } else if (i - 1 === -1) {
        arr[i][j] = arr[i][j - 1] % 1000000007;
      } else if (j - 1 === -1) {
        arr[i][j] = arr[i - 1][j] % 1000000007;
      } else {
        arr[i][j] = (arr[i - 1][j] + arr[i][j - 1]) % 1000000007;
      }
    }
  }

  return arr[n - 1][m - 1];
}
