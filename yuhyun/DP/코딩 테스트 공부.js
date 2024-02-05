function solution(alp, cop, problems) {
  let maxAlp = alp;
  let maxCop = cop;
  let maxAlpRwd = 0;
  let maxCopRwd = 0;

  problems.forEach(([reqAlp, reqCop, rwdAlp, rwdCop]) => {
    if (maxAlp < reqAlp) maxAlp = reqAlp;
    if (maxCop < reqCop) maxCop = reqCop;
    if (maxAlpRwd < rwdAlp) maxAlpRwd = rwdAlp;
    if (maxCopRwd < rwdCop) maxCopRwd = rwdCop;
  });

  const ROW = maxAlp + maxAlpRwd + 1;
  const COL = maxCop + maxCopRwd + 1;

  const dp = Array.from(Array(ROW), () => Array(COL).fill(Infinity));
  dp[alp][cop] = 0;

  problems.push([0, 0, 1, 0, 1], [0, 0, 0, 1, 1]);

  let result = Infinity;
  for (let row = alp; row < ROW; row += 1) {
    for (let col = cop; col < COL; col += 1) {
      problems.forEach(([reqAlp, reqCop, rwdAlp, rwdCop, cost]) => {
        const beforeRow = row - rwdAlp < alp ? alp : row - rwdAlp;
        const beforeCol = col - rwdCop < cop ? cop : col - rwdCop;
        const solvable = reqAlp <= beforeRow && reqCop <= beforeCol;
        const newCost = dp[beforeRow][beforeCol] + cost;
        if (solvable && newCost < dp[row][col]) {
          dp[row][col] = newCost;
        }
      });

      if (row >= maxAlp && col >= maxCop && result > dp[row][col]) {
        result = dp[row][col];
      }
    }
  }

  return result;
}
