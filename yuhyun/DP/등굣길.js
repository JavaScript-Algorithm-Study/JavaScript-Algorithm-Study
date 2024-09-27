function solution(m, n, puddles) {
  const PADDING = 1;

  const puddleSet = (() => {
    const result = new Set();
    puddles.forEach(([y, x]) => result.add(`${x}-${y}`));
    return result;
  })();
  const dp = Array.from(Array(n + PADDING), () => Array(m + PADDING).fill(0));
  dp[PADDING][PADDING] = 1;

  const isPuddle = (x, y) => {
    return puddleSet.has(`${x}-${y}`);
  };

  for (let x = PADDING; x < n + PADDING; x++) {
    for (let y = PADDING; y < m + PADDING; y++) {
      const curPuddle = isPuddle(x, y);
      if (curPuddle) {
        continue;
      }

      dp[x][y] += (dp[x - 1][y] + dp[x][y - 1]) % 1_000_000_007;
    }
  }

  return dp[n][m];
}
