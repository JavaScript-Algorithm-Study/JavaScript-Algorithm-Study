//https://www.acmicpc.net/problem/2623
//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
6 3
3 1 4 3
4 6 2 5 4
2 3 2
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

class Queue {
  l = 0;
  r = 0;
  d = {};
  push(data) {
    this.d[this.r++] = data;
  }
  pop() {
    if (this.isEmpty()) return undefined;
    const result = this.d[this.l];
    delete this.d[this.l++];
    return result;
  }
  isEmpty() {
    return this.l === this.r;
  }
}

function makeEdges(orders) {
  const edges = [];

  orders.forEach((order) => {
    for (let i = 1; i < order.length; i++) {
      const [before, now] = [order[i - 1], order[i]];

      edges.push([before, now]);
    }
  });

  return edges;
}

function solution(maxNodeNum, orders) {
  const edges = makeEdges(orders);
  const inDegrees = Array(maxNodeNum + 1).fill(0);
  const queue = new Queue();
  const graph = {};
  const result = [];

  // 그래프 초기화,
  edges.forEach(([from, to]) => {
    if (graph[from]) {
      graph[from].push(to);
    } else {
      graph[from] = [to];
    }

    inDegrees[to]++;
  });

  // 진입차수 0인거 넣어줌
  inDegrees.slice(1).forEach((inDegree, singerNum) => {
    if (inDegree === 0) {
      queue.push(singerNum + 1);
    }
  });

  for (let i = 0; i < maxNodeNum; i++) {
    // 모든 노드를 확인하지 않았는데 큐가 비었으면 순환하는 구간이 존재
    if (queue.isEmpty()) {
      return 0;
    }

    const now = queue.pop();
    result.push(now);

    graph[now]?.forEach((next) => {
      if (--inDegrees[next] === 0) {
        queue.push(next);
      }
    });
  }

  return result.join("\n");
}
const [N, M] = input(); //[가수 수, PD 수]
const orders = Array.from({ length: M }, () => input().slice(1));
console.log(solution(N, orders));

// 위상정렬 쓰면 될듯
// 불가능한 경우: 모든 노드를 방문하지 않았는데 큐가 빌 경우
// 1 4 3
// 6 2 5 4
// 2 3

// 1 6

// 1 -> 4 -> 3
// 6 -> 2 -> 5 -> 4
// 3 -> 2

// 입차수: [1, 2, 3, 4, 5, 6]
//       [0, 2, 1, 2, 1, 0]
