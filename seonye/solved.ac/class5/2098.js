const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(n, cost) {
  const dp = Array.from({ length: n }, () => Array(1 << n).fill(-1)); // dp[i][j] : i에서 출발해서 j만큼 방문했을 때의 최소 비용

  const dfs = (now, visited) => {
    //모든 도시 방문 완료
    if (visited === (1 << n) - 1) {
      //경로가 없는 경우 Infinity로 탐색 무효화
      if (cost[now][0] === 0) return Infinity;
      //경로가 있는 경우
      else return cost[now][0];
    }

    //이미 방문한 도시
    if (dp[now][visited] !== -1) return dp[now][visited];

    //해당 도시에 출석 표시
    dp[now][visited] = Infinity;

    // 방문하지 않은 도시 탐색
    for (let i = 0; i < n; i++) {
      //경로가 없는 경우
      if (cost[now][i] === 0) continue;
      //이미 방문한 도시인 경우
      if (visited & (1 << i)) continue;
      dp[now][visited] = Math.min(
        dp[now][visited],
        cost[now][i] + dfs(i, visited | (1 << i))
      );
    }
    return dp[now][visited];
  };

  return dfs(0, 1);
}

const n = Number(input[0]);
const cost = input.slice(1).map((row) => row.split(' ').map(Number));
console.log(solution(n, cost));
