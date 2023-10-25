// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/42626
// 시작날짜: 2023.10.21
// 시작시간: 15:27
// 종료시간: 17:13
// 소요시간: 01:46

// 우선순위큐 구현 시작 16:26
// 우선순위큐 구현 끝은 16:42
// 우선순위큐 걸린 시간 00:16

// 현재 K보다 크지만 뒤에 많은 경우가 K보다 작을 경우가 존재할 수 있음 따라서 최소 우선순위 큐 적용해야함
// if (!result) return undefined; 를 해야하는데 undifined를 해서 런타임에러 남. 조심하자
// 반례를 넣으면서 찾다보니 -1 일 때 결과가 제대로 나오질 않았음. 그래서 return에서 이를 확인해줌
// 디버깅 해보니 우선순위 큐 구현할 때 this.heap[left] !== undefined가 아니라
// !this.heap[left]로 확인해줘서 그 값이 0이면 false로 처리해줬음. 이로인해 문제가 생김

// 모든 음식의 스코빌 지수를 K 이상으로 만들거임
// 지수가 가능 낮은 두개의 음식을 아래로 섞음
// 섞은 음식의 스코빌 = 가장 안매운 음식 스코빌 + 두번째로 안매운 음식 스코빌 * 2
// 모든 음식의 스코빌 지수가 K 이상 될 때 까지 반복해서 섞음.
// 최소 몇회 섞어야 하는가?

// 직접 섞는걸 구현할려 했는데 그럴 피룡가 없음

class MinHeap {
  heap = [];
  head() {
    if (!this.heap.length) return undefined;
    return this.heap[0];
  }

  push(data) {
    // 맨 끝에 넣고 위로 올라오면서 부모 > 현재 라면 스왑함
    // 부모 = Math.floor((now-1) / 2);
    // left = now * 2 + 1
    // right = now * 2 + 2
    this.heap.push(data);
    let now = this.heap.length - 1;
    while (now > 0) {
      const parent = Math.floor((now - 1) / 2);
      if (this.heap[parent] > this.heap[now]) {
        this.swap(now, parent);
        now = parent;
      } else {
        return;
      }
    }
  }
  pop() {
    if (!this.heap.length) return undefined;
    const result = this.heap[0];

    // 맨 끝이랑 스왑 후 마지막꺼 버림
    let parent = 0;
    let left = 1;
    let right = 2;

    this.swap(0, this.heap.length - 1);
    this.heap.pop();

    // 왼쪽이 존재할 때 while 반복
    while (this.heap[left] !== undefined) {
      let next = left;
      if (this.heap[right] && this.heap[left] > this.heap[right]) {
        next = right;
      }

      // parent > next 일 경우 스왑
      if (this.heap[parent] > this.heap[next]) {
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
}
function solution(scoville, K) {
  // 1. 우선순위큐에 다 넣음
  // 2. 두개를 빼고서 계산을 하고 넣음 근데 빼다가 K보다 크면 리턴함
  // 3. 2를 반복함

  const q = new MinHeap();

  scoville.forEach((now) => {
    q.push(now);
  });

  let count = 0;

  while (q.head() < K) {
    const small = q.pop();
    const big = q.pop();

    const next = small + big * 2;
    q.push(next);
    count++;
  }

  console.log(q.head(), K, count);
  return q.head() >= K ? count : -1;
}
