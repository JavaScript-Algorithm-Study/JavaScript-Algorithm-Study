// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/118668
// 풀이날짜: 2024.01.28

// 150 * 150 * 100 으로도 안돼서 뭔가 이상함... 그래서 시간 많이 날림
// forEach, Math.min 쓰면 시간초과함 그래서 for of, min함수 만들어서 썼더니 시간초과 안남

const min = (a, b) => (a < b ? a : b);

function solution(alp, cop, problems) {
  let [maxAlp, maxCop] = [alp, cop];

  for (let i = 0; i < problems.length; i++) {
    if (maxAlp < problems[i][0]) maxAlp = problems[i][0];
    if (maxCop < problems[i][1]) maxCop = problems[i][1];
  }

  problems.push([0, 0, 1, 0, 1], [0, 0, 0, 1, 1]);

  const dp = Array.from({ length: maxAlp + 1 }, () => Array.from({ length: maxCop + 1 }, () => Infinity));

  dp[alp][cop] = 0;

  for (let i = alp; i <= maxAlp; i++) {
    for (let j = cop; j <= maxCop; j++) {
      for (const [req_alp, req_cop, rwd_alp, rwd_cop, cost] of problems) {
        // 문제를 못풀면 아래는 넘어감
        if (i < req_alp || j < req_cop) continue;
        // 배열 넘어갔을 때 방지
        const nowAlp = min(i + rwd_alp, maxAlp);
        const nowCop = min(j + rwd_cop, maxCop);
        // 문제를 풀었을 경우 더 적은 시간을 쓴다면
        // dp[문제푼후알고][문제푼후코딩]의 cost 추가한걸로 변경함
        dp[nowAlp][nowCop] = min(dp[nowAlp][nowCop], dp[i][j] + cost);
      }
    }
  }

  return dp[maxAlp][maxCop];
}

// 근데 아래 다익스트라는 시간초과남 왜지? JS는 시간이 엄청 타이트한가...
class PQ {
  constructor(cmp) {
    this.cmp = (a, b) => cmp(this.arr[a], this.arr[b]);
  }
  arr = [];
  push(data) {
    // 아래 -> 위, 아래가 위보다 작으면 swap, cmp는 작은게 왼쪽
    this.arr.push(data);
    let now = this.arr.length - 1;
    while (now > 0) {
      const parent = Math.floor((now - 1) / 2);

      if (this.cmp(now, parent) < 0) {
        this.swap(now, parent);
        now = parent;
      } else {
        break;
      }
    }
  }
  pop() {
    if (this.isEmpty()) return undefined;
    this.swap(0, this.arr.length - 1);
    const result = this.arr.pop();
    // 위 -> 아래, 아래가 위보다 작다면 swap, cmp는 작은게 왼쪽
    let now = 0;
    let left = 1;
    let right = 2;
    while (this.arr[left] !== undefined) {
      let next = left;
      if (this.arr[right] !== undefined && this.cmp(right, left) < 0) {
        next = right;
      }
      if (this.cmp(next, now) < 0) {
        this.swap(next, now);
        now = next;
        left = now * 2 + 1;
        right = now * 2 + 2;
      } else {
        break;
      }
    }
    return result;
  }
  isEmpty() {
    return this.arr.length === 0;
  }
  swap(a, b) {
    [this.arr[a], this.arr[b]] = [this.arr[b], this.arr[a]];
  }
}

function getMaxAlpCop(alp, cop, problems) {
  let [maxAlp, maxCop] = [alp, cop];
  problems.forEach(([alp_req, cop_req]) => {
    if (alp_req > maxAlp) maxAlp = alp_req;
    if (cop_req > maxCop) maxCop = cop_req;
  });
  return [maxAlp, maxCop];
}
function solution(alp, cop, problems) {
  const pq = new PQ((a, b) => a[2] - b[2]);
  const [maxAlp, maxCop] = getMaxAlpCop(alp, cop, problems);
  const dp = Array.from({ length: maxAlp + 1 }, () => Array.from({ length: maxCop }, () => 30000));

  problems.push([0, 0, 1, 0, 1]);
  problems.push([0, 0, 0, 1, 1]);
  pq.push([alp, cop, 0]);
  dp[alp][cop] = 0;

  while (!pq.isEmpty()) {
    const [nowAlp, nowCop, nowCost] = pq.pop();
    if (nowAlp >= maxAlp && nowCop >= maxCop) {
      return nowCost;
    }

    problems.forEach(([alp_req, cop_req, alp_rwd, cop_rwd, cost]) => {
      let [nextAlp, nextCop, nextCost] = [nowAlp + alp_rwd, nowCop + cop_rwd, nowCost + cost];

      if (nextAlp >= maxAlp) nextAlp = maxAlp;
      if (nextCop >= maxCop) nextCop = maxCop;

      if (dp[nextAlp][nextCop] <= nextCost) return;
      if (nowAlp < alp_req || nowCop < cop_req) return;

      dp[nextAlp][nextCop] = nextCost;
      pq.push([nextAlp, nextCop, nextCost]);
    });
  }
}
