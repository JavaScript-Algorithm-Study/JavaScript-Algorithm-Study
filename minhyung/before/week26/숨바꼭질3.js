//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
5 17
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

class Dequeue {
  l = 0;
  r = 0;
  d = {};
  pushLeft(data) {
    this.d[--this.l] = data;
  }
  pushRight(data) {
    this.d[this.r++] = data;
  }
  popLeft() {
    if (this.isEmpty()) return undefined;
    const result = this.d[this.l];
    delete this.d[this.l++];
    return result;
  }
  isEmpty() {
    return this.l === this.r;
  }
}

const POS_MIN_X = 0;
const POS_MAX_X = 100_000;

function solution(start, goal) {
  const dq = new Dequeue();
  const visited = Array.from({ length: POS_MAX_X + 1 }, () => false);
  dq.pushLeft([start, 0]);

  while (!dq.isEmpty()) {
    const [now, dist] = dq.popLeft();

    if (now === goal) {
      return dist;
    }

    if (visited[now]) continue;
    visited[now] = true;

    if (now + 1 <= POS_MAX_X) dq.pushRight([now + 1, dist + 1]);
    if (now - 1 >= POS_MIN_X) dq.pushRight([now - 1, dist + 1]);
    if (now * 2 <= POS_MAX_X) dq.pushLeft([now * 2, dist]);
  }
}

const [N, K] = input();
console.log(solution(N, K));

// N: 0 ~ 10만, 수빈
// K: 0 ~ 10만, 동생

// 수빈이 x면 1초후 x-1 or x+1
// 순간이동: 0초후 2*x
// 동생을 찾는 가장 빠른 시간?

// 10만을 넘으면 리턴
// +1, -1은 오른쪽에 넣고
// 순간이동은 왼쪽에 넣음
// 그냥 하면 메모리 초과 -> visit 사용함
