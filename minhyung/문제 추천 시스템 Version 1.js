// 문제링크: https://www.acmicpc.net/problem/21939
// 시작날짜: 2023.10.21
// 시작시간: 17:16
// 종료시간: 19:03
// 소요시간: 01:47
// 우선순위큐 구현 시작: 17:31
// 우선순위큐 구현 끝은: 17:55
// 우선순위큐 구현 소요: 00:24 (this를 엉뚱한곳에 쓰고 있었음)
// 문자열로 비교해서 이상하게 비교가 됐음 ex) 1, 10, 4 비교시 1,10,4
class Heap {
  constructor(comp) {
    this.heap = [];
    this.comp = comp;
  }
  front() {
    if (this.isEmpty()) return undefined;
    return this.heap[0];
  }
  push(data) {
    this.heap.push(data);
    let now = this.heap.length - 1;
    while (now > 0) {
      const parent = Math.floor((now - 1) / 2);
      // 최소힙 -> 부모 > 자식 이면 교환
      if (this.comp(this.heap[parent], this.heap[now])) {
        this.swap(now, parent);
        now = parent;
      } else {
        return;
      }
    }
  }
  pop() {
    if (this.isEmpty()) return undefined;
    const result = this.heap[0];
    this.swap(0, this.heap.length - 1);
    this.heap.pop();

    let parent = 0;
    let left = 1;
    let right = 2;
    while (this.heap[left] !== undefined) {
      let next = left;
      // 최소힙 -> left > right면 교환
      if (
        this.heap[right] !== undefined &&
        this.comp(this.heap[left], this.heap[right])
      ) {
        next = right;
      }

      if (this.comp(this.heap[parent], this.heap[next])) {
        this.swap(parent, next);
        parent = next;
        left = parent * 2 + 1;
        right = parent * 2 + 2;
      } else {
        break;
      }
    }
    return result;
  }
  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
  isEmpty() {
    return this.heap.length === 0;
  }
}
//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = `
8
1 1
2 1
3 1
4 1
5 1
6 1
7 1
8 1
6
add 9 1
add 10 1
add 11 1
add 12 1
add 13 1
recommend -1

`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ')})();

// 코테 문제를 풀어서 '문제번호' '난이도' 로 정리 해 놨다.
// 만들려 하는 명령어는 3가지
// 1. recommend x
//   - x가 1인경우 리스트에서 가장 어려운 문제 번호를 출력한다.
//     - 만약 여러개면 문제 번호가 가장 큰것으로 출력한다.
//   - x가 -1인 경우 문제 리스트에서 가장 쉬운 문제 번호를 출력한다.
//     - 만약 여러개면 문제 번호가 가장 작은것으로 출력한다.
// 2. add P L
//   - 리스트에서 난이도가 L인 문제번호 P를 추가한다.
//     - 리스트에 없는 문제 번호 P만이 입력으로 주어진다.
//     - 이전 추천 문제 리스트의 문제 번호가 다른 난이도로 다시 들어올 수 있다.(삭제후)
// 3. solved P
//   - 리스트에서 문제번호 P를 제거한다.
//     - 리스트에 있는 문제번호 P만 들어온다.

// 출력 => recommend 명령이 주어질 때마다 문제 번호를 한 줄씩 출력한다.
//        최소 한번의 recommend 명령어가 들어온다.

const N = +input();
const list = {};
const minheap = new Heap((a, b) => {
  if (a.L > b.L) return true;
  if (a.L < b.L) return false;
  if (a.P > b.P) return true;
  return false;
});
const maxheap = new Heap((a, b) => {
  if (a.L < b.L) return true;
  if (a.L > b.L) return false;
  if (a.P < b.P) return true;
  return false;
});

for (let i = 0; i < N; i++) {
  const [P, L] = input().slice(" ").map(Number);
  minheap.push({ P, L });
  maxheap.push({ P, L });
  list[P] = L;
}

const M = +input();

for (let i = 0; i < M; i++) {
  let [cmd, P, L] = input().slice(" ");
  P = +P;
  L = +L;
  const cmds = {
    recommend: () => {
      // 가장 어려운 번호 출력
      if (P === 1) {
        console.log(getLevel(maxheap));
      }
      // 가장 쉬운 번호 출력
      if (P === -1) {
        console.log(getLevel(minheap));
      }
    },
    add: () => {
      minheap.push({ P, L });
      maxheap.push({ P, L });
      list[P] = L;
    },
    solved: () => {
      delete list[P];
    },
  };
  cmds[cmd]();
}

function isInListLevel(heap) {
  const front = heap.front();
  if (!list[front.P]) return false;
  return list[front.P] === front.L;
}
function getLevel(heap) {
  // 현재 front가 list에 존재하지 않는다면 나올 때 까지 뽑음
  if (!isInListLevel(heap)) {
    // Problem의 Level이 같아질 때 까지 pop함
    while (!isInListLevel(heap)) {
      heap.pop();
    }
  }
  return heap.front().P;
}
