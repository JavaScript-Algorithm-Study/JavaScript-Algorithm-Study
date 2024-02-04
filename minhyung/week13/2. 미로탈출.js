// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/118669
// 시작날짜: 2024.02.04
class PQ {
  constructor(cmp) {
    this.cmp = (a, b) => cmp(this.arr[a], this.arr[b]);
    this.arr = [];
  }
  push(data) {
    this.arr.push(data);
    let now = this.getLastIdx();
    // 아래 -> 위, cmp(now, parent)
    while (now > 0) {
      const parent = this.getParentIdx(now);
      if (this.cmp(now, parent) < 0) {
        this.swap(now, parent);
        now = parent;
      } else {
        break;
      }
    }
  }
  pop() {
    this.swap(0, this.getLastIdx());
    const result = this.arr.pop();
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
        left = this.getLeftIdx(now);
        right = this.getRightIdx(now);
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
  getLastIdx() {
    return this.arr.length - 1;
  }
  getParentIdx(idx) {
    return Math.floor((idx - 1) / 2);
  }
  getLeftIdx(idx) {
    return idx * 2 + 1;
  }
  getRightIdx(idx) {
    return idx * 2 + 2;
  }
}
// true: 정방향, false: 역방향
function makeGraph(graph, P, Q, S, direction) {
  // P -> Q 방향이 존재하면
  if (graph[P]?.[Q]?.[direction]?.cost) {
    graph[P][Q][direction].cost = Math.min(graph[P]?.[Q]?.[direction].cost, S);
  } else {
    graph[P]
      ? (graph[P][Q] = { ...graph[P][Q], [direction]: { cost: S, isTrap: false } })
      : (graph[P] = { [Q]: { [direction]: { cost: S, isTrap: false } } });
  }
}

// 처음엔 노드 자체의 state를 바꾸려 했는데 그러면 너무 복잡해짐
// 그래서 trap의 상태를 밖에서 따로 관리해줌
// 밖에서 관리해주니까 문제가 생겨서 queue에 함께 넣어줌
// 상태를 true, false로만 관리하면 양쪽으로 간선이 있을 때 문제가 생김
// 3, 1, 3, [[1, 2, 2], [3, 2, 3], [1, 2, 10], [2, 3, 1]], [2] 이 때인데
// 원래 5가 나와야 하는데 7이나옴
// 그래서 정방향과 역방향에 대해 추가를 해줬는데 더 많은 예외가 존재함
// 아마 트랩이 여러개일 때의 상황을 처리 못하는것같음
function solution(n, start, end, roads, traps) {
  const dist = Array(n + 1).fill(Infinity);
  const goStates = Array(n + 1).fill(true);
  const graph = {};
  const pq = new PQ((a, b) => a[1] - b[1]);

  // 그래프를 연결함
  roads.forEach(([P, Q, S]) => makeGraph(graph, P, Q, S, true));

  // 그래프를 돌면서 연결된 노드를 추가해줌
  Object.entries(graph).forEach(([k1, v1]) => {
    Object.entries(v1).forEach(([k2, v2]) => {
      // 역방향이 존재하면 역방향을 해당 간선의 값으로 지정함
      if (graph[k2]?.[k1]?.true) {
        makeGraph(graph, k1, k2, graph[k2][k1].true.cost, false);
      }
      // 역방향이 존재하지 않으면 역방향의 역방향을 현재의 정방향으로 지정
      else {
        makeGraph(graph, k2, k1, graph[k1][k2].true.cost, false);
      }
      const isTrap = traps.some((trap) => trap == k2);
      if (isTrap && graph[k1][k2].true) {
        graph[k1][k2].true.isTrap = true;
      }
    });
  });

  // console.log(s)
  pq.push([start, 0, goStates, false]);
  dist[start] = 0;

  // console.log(JSON.stringify(graph));
  while (!pq.isEmpty()) {
    const [now, weight, nowGoStates, isTrapNowNode] = pq.pop();

    if (now == end) {
      return dist[end];
    }

    // 현재 노드에 왔는데 trap이면 nowGoStates의 상태를 바꿔줌
    const isTrap = traps.some((trap) => trap == now);
    if (isTrap) {
      nowGoStates[now] = !nowGoStates[now];
    }

    // 현재 일반
    //  - 다음 일반: 그냥 true 사용하면 됨
    //  - 다음 트랩(true): 경로 true 사용
    //  - 다음 트랩(false): 경로 false 사용
    // 현재 트랩(true)
    //  - 다음 일반: true 사용
    //  - 다음 트랩(true): true 사용
    //  - 다음 트랩(false): false 사용
    // 현재 트랩(false)
    //  - 다음 일반: false 사용
    //  - 다음 트랩(true): false 사용
    //  - 다음 트랩(false): true 사용
    Object.entries(graph[now]).forEach(([next, goState]) => {
      const isTrapNextNode = nowGoStates[next];
      // 두개다 트랩이고 상태가 다르면 false를 사용해야함
      // 한쪽만 트랩이면 그 트랩의 상태를 사용해야함
      // 둘다 아니면 true 사용하면됨
      let nowState = false;
      if (isTrapNowNode && isTrapNextNode && nowGoStates[now] !== nowGoStates[next]) {
        nowState = false;
      } else if (isTrapNowNode) {
        nowState = nowGoStates[now];
      } else if (isTrapNextNode) {
        nowState = nowGoStates[next];
      } else {
        nowState = true;
      }
      const cost = goState[nowState]?.cost;
      const isTrap = goState[nowState]?.isTrap;
      if (!cost) return;

      dist[next] = weight + cost;
      pq.push([next, weight + cost, nowGoStates, isTrap]);
    });
  }
}

// 1: 시작, 2: 트랩, 3: 끝
// 2로 이동하면해당 정점과 연결된 모든 화살표 방향이 바뀜
// 최소 시간을 구해야함

// V = 1,000
// E = 3,000

// 시작: 18:10
// isTrap: 해당 노드가 trap 노드인지, trap이라면 해당 노드와 연결된 모든 노드의 방향을 반대로 바꿈
// goState: 해당 노드로 갈 수 있는지에 대한 변수
// changeGoState(): 갈 수 있는 방향을 바꿈
// start를 시작 큐에 넣음
//
