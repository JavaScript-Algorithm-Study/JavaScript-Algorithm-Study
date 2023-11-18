/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/72413
난이도 : Level3

풀이
각 노드마다 s, a, b 로 도달하는데 드는 비용이 최소인 값을 구한다.
*/
class Heap {
  constructor(compareFn) {
    this.compareFn = compareFn;
    this.heap = [];
  }

  getLeftChildIndex = (parentIndex) => parentIndex * 2 + 1;
  getRightChildIndex = (parentIndex) => parentIndex * 2 + 2;
  getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2);

  hasLeftChild = (parentIndex) => this.getLeftChildIndex(parentIndex) < this.heap.length;
  hasRightChild = (parentIndex) => this.getRightChildIndex(parentIndex) < this.heap.length;
  hasParent = (childIndex) => this.getParentIndex(childIndex) >= 0;

  size = () => this.heap.length;
  swap = (a, b) => ([this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]);
  isEmpty = () => this.size() === 0;

  push(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  pop() {
    if (this.size() <= 1) return this.heap.pop();

    const value = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();

    return value;
  }

  top() {
    return this.heap[0];
  }

  heapifyUp() {
    let cur = this.size() - 1;
    while (this.hasParent(cur) && this.compareFn(this.heap[cur], this.heap[this.getParentIndex(cur)]) < 0) {
      const next = this.getParentIndex(cur);
      this.swap(cur, next);
      cur = next;
    }
  }

  heapifyDown() {
    let cur = 0;
    while (this.hasLeftChild(cur)) {
      let smallerChildIndex = this.getLeftChildIndex(cur);

      if (
        this.hasRightChild(cur) &&
        this.compareFn(this.heap[this.getRightChildIndex(cur)], this.heap[this.getLeftChildIndex(cur)]) < 0
      ) {
        smallerChildIndex = this.getRightChildIndex(cur);
      }
      if (this.compareFn(this.heap[cur], this.heap[smallerChildIndex]) <= 0) break;

      this.swap(cur, smallerChildIndex);
      cur = smallerChildIndex;
    }
  }
}

function solution(n, s, a, b, fares) {
  var answer = 0;
  const graph = Array.from({ length: n + 1 }, () => []);
  for (let i = 0; i < fares.length; i++) {
    const [n, m, cost] = fares[i];
    graph[n].push([m, cost]);
    graph[m].push([n, cost]);
  }

  function dijkstra(start) {
    let pq = new Heap((a, b) => a[0] - b[0]);
    pq.push([0, start]);
    distance[start] = 0;

    while (pq.size() !== 0) {
      let [dist, now] = pq.pop();
      if (distance[now] < dist) continue;

      for (let i of graph[now]) {
        let cost = dist + i[1];
        if (cost < distance[i[0]]) {
          distance[i[0]] = cost;
          pq.push([cost, i[0]]);
        }
      }
    }
  }

  let minCost = Infinity;

  for (let i = 1; i < n + 1; i++) {
    distance = new Array(n + 1).fill(Infinity);
    let start = i;
    dijkstra(start);
    let totalCost = distance[s] + distance[a] + distance[b];

    minCost = Math.min(minCost, totalCost);
  }

  answer = minCost;

  return answer;
}
