function solution(sales, links) {
  let tree = {};

  links.forEach(([from, to]) => {
    tree[from] ? tree[from].push(to) : (tree[from] = [to]);
  });

  // [i][0] : i가 참석 x, [i][1] : i가 참석 o
  let dp = Array.from(Array(sales.length + 1), () => Array(2).fill(0));

  function dfs(start) {
    dp[start][0] = 0;
    dp[start][1] = sales[start - 1];

    // leaf라면
    if (!tree[start]) {
      return;
    }

    let cost = Infinity;

    for (let i = 0; i < tree[start].length; i++) {
      const child = tree[start][i];
      dfs(child);

      if (dp[child][0] < dp[child][1]) {
        dp[start][0] += dp[child][0];
        dp[start][1] += dp[child][0];
        cost = Math.min(cost, dp[child][1] - dp[child][0]);
      } else {
        dp[start][0] += dp[child][1];
        dp[start][1] += dp[child][1];
        cost = 0;
      }
    }
    dp[start][0] += cost;
  }

  dfs(1);

  return Math.min(dp[1][0], dp[1][1]);
}
