//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
3 2
1 65
5 23
2 99
10
2
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

class PriorityQ {
  constructor(cmp) {
    this.cmp = (a, b) => cmp(this.q[a], this.q[b]);
    this.q = [];
  }
  front() {
    return this.q[0];
  }
  push(data) {
    this.q.push(data);
    let now = this.q.length - 1;

    // 아래 -> 위
    while (now > 0) {
      const parent = this.parent(now);

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
    this.swap(0, this.q.length - 1);
    const result = this.q.pop();
    let now = 0;
    let left = 1;
    let right = 2;

    // 위 -> 아래
    while (this.q[left] !== undefined) {
      let next = left;
      if (this.q[right] !== undefined && this.cmp(right, left) < 0) {
        next = right;
      }
      if (this.cmp(next, now) < 0) {
        this.swap(next, now);
        now = next;
        left = this.left(now);
        right = this.right(now);
      } else {
        break;
      }
    }

    return result;
  }
  swap(a, b) {
    [this.q[a], this.q[b]] = [this.q[b], this.q[a]];
  }
  isEmpty() {
    return this.q.length === 0;
  }
  parent = (idx) => Math.floor((idx - 1) / 2);
  left = (idx) => idx * 2 + 1;
  right = (idx) => idx * 2 + 2;
}
function solution(n, jewels, bags) {
  jewels.sort((a, b) => a[0] - b[0]);
  bags.sort((a, b) => a - b);

  const pq = new PriorityQ((a, b) => b - a);
  let result = 0;
  let idx = 0;

  bags.forEach((bag) => {
    while (idx < n && jewels[idx][0] <= bag) {
      pq.push(jewels[idx++][1]);
    }

    if (!pq.isEmpty()) {
      result += pq.pop();
    }
  });

  return result;
}

const [N, K] = input(); //N: 보석 개수, K: 가방 개수
// 무게, 가격
const jewels = Array.from({ length: N }, () => input());
// 최대무게
const bags = Array.from({ length: K }, () => +input());

console.log(solution(N, jewels, bags));
