//https://www.acmicpc.net/problem/7579
//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
5 60
10 20 30 40 60
1 1 1 1 0
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

const MAX_COST = 10000 + 1; //Math.max(...costs);

function solution(maxAppNumber, needMemory, memories, costs) {
  const dp = Array.from({ length: maxAppNumber + 1 }, () => Array(MAX_COST).fill(0));

  for (let appIdx = 1; appIdx < maxAppNumber + 1; appIdx++) {
    for (let cost = 0; cost < MAX_COST; cost++) {
      const [shutDownCost, memory] = [costs[appIdx - 1], memories[appIdx - 1]];

      if (cost - shutDownCost < 0) {
        dp[appIdx][cost] = dp[appIdx - 1][cost];
      } else {
        dp[appIdx][cost] = Math.max(dp[appIdx - 1][cost], dp[appIdx - 1][cost - shutDownCost] + memory);
      }
    }
  }

  for (let i = 0; i < MAX_COST; i++) {
    if (dp.at(-1)[i] >= needMemory) {
      return i;
    }
  }
}

const [N, M] = input(); // N: 앱 개수, M: 필요한 메모리
const memories = input();
const costs = input();
console.log(solution(N, M, memories, costs));

// // 비활성화: 메모리 부족하면 활성화 돼있는 앱 몇개 선택해 메모리로부터 삭제하는 과정
// // B앱을 실행할 때 M바이트 메모리가 필요하면 최소비용으로 메모리 M 바이트 확보해야함

// // 우선순위 큐에 얻는 메모리 대비 낮은 코스트를 가진 순으로 정렬하면 될것같은데 -> 안될듯
// // 코스트가 낮은거 순으로 정렬하면? -> 예외 분명히 있음
// // 그냥 전부 추가 한 다음에 높은 코스트 빼면? -> 예외 있어보임
// // dp? -> 배낭문제랑 비슷한듯
// // 배낭문제: 무게를 최소화 하면서 가치를 최대로: 각 무게에 가치가 얼마나 들어가는지
// // 이문제: 코스트를 최소화 하면서 메모리가 M 이상: 각 코스트에 메모리가 얼마나 들어가는지
// 코스트가 0일때를 체크 안해줘서 한번 틀림

// N <= 100, 메모리 <= 천만, 코스트 <= 100,
