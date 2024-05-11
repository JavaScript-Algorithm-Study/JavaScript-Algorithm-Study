//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
3 3 5
0 10 0
13 20 11
45 14 0
0 10 10
10 10 10
10 10 0
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

function solution(maxRow, maxCol, time, works, times) {
  //prettier-ignore
  const moved = [[-1,-1],[-1,0],[0,-1]]
  const dp = Array.from({ length: maxRow }, () => Array.from({ length: maxCol }, () => Array(time + 1).fill(-1)));
  // dp[0][0].forEach((_, idx) => (dp[0][0][idx] = 0));
  dp[0][0][0] = 0;
  // dp[0][0][1] = 0;

  for (let nowY = 0; nowY < maxRow; nowY++) {
    for (let nowX = 0; nowX < maxCol; nowX++) {
      // 초기 위치는 아무것도 하지않음
      if (nowY === 0 && nowX === 0) continue;
      // 3방향 for문
      for (const [movedY, movedX] of moved) {
        const [beforeY, beforeX] = [nowY + movedY, nowX + movedX];
        if (dp?.[beforeY]?.[beforeX] === undefined) continue;

        // 시간 1 ~ time까지 둘러보는 for문
        for (let t = 1; t < time + 1; t++) {
          // 일을 하지 않았을 때
          const comeWithoutWork = dp?.[beforeY]?.[beforeX]?.[t - 1];
          if (comeWithoutWork === undefined) continue;
          dp[nowY][nowX][t] = Math.max(dp[nowY][nowX][t], comeWithoutWork);

          // 이전에 일을 하고 왔을 때
          const beforeTime = times[beforeY][beforeX];
          const beforeWork = works[beforeY][beforeX];
          const comeWithWork = dp?.[beforeY]?.[beforeX]?.[t - 1 - beforeTime];
          // 현재 시간에는 도달할 수 없으면 다음 시간을 봄
          if (comeWithWork === undefined || comeWithWork === -1) continue;
          dp[nowY][nowX][t] = Math.max(dp[nowY][nowX][t], comeWithWork + beforeWork);
        }
      }
    }
  }

  return Math.max(...dp[maxRow - 1][maxCol - 1]);
}

const [N, M, T] = input(); // 세로, 가로, 남은시간
const works = Array.from({ length: N }, () => input());
const times = Array.from({ length: N }, () => input());
console.log(solution(N, M, T, works, times));

// dp[i][j][k] = i, j 에 k라는 시간에 도달했을 때 할수있는 최대일 개수

// 아래 두가지를 세방향에 대해서 구함
// k에서 숫자를 뺐을 때 0보다 작으면 도달할 수 없는 시간이므로 넘김
// 이전 장소에서 일을 하지않고 이동했을 때
// Math.max(현재, [i][j-1][k-1])
// 이전 장소에서 일을 하고 이동했을 때
// Math.max(현재, [i][j-1][k-1-이전 위치 일하는데 걸린 시간] + 이전위치 할수있는일)

const a = "abc";
const c = "";
// a[0] = "a";
console.log(a.slice(1));
console.log(a.slice(2));
