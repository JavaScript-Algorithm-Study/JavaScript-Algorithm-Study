/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/49189

난이도 : Level3

1. 문제 설명
가장 멀리 떨어진 노드의 갯수 구하기
최단 경로로 이동했을 때 간선의 개수가 가장 많은 노드

노드의 개수 n, 간선에 대한 정보가 담긴 2차원 배열 edge
1번 노드로부터 가장 멀리 떨어진 노드가 몇 개인지 return

2. 풀이
다익스트라 알고리즘으로 1번 노드에서 모든 노드까지 도달하는 최단거리를 계산한 후
최대 값의 개수를 구하면 된다.
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

function solution(n, edge) {
  var answer = 0;

  const graph = Array.from({ length: n + 1 }, () => []);
  for (let i = 0; i < edge.length; i++) {
    const [n, m] = edge[i];
    graph[n].push(m);
    graph[m].push(n);
  }
  const distance = new Array(n + 1).fill(Infinity);
  let start = 1;

  function dijkstra() {
    let pq = new Heap((a, b) => a[0] - b[0]);
    pq.push([0, start]);
    distance[start] = 0;

    while (pq.size() !== 0) {
      let [dist, now] = pq.pop();
      if (distance[now] < dist) continue;

      for (let i of graph[now]) {
        let cost = dist + 1;
        if (cost < distance[i]) {
          distance[i] = cost;
          pq.push([cost, i]);
        }
      }
    }
  }

  dijkstra();
  const Distance = distance.splice(1, n);
  const maxDistance = Distance.reduce((a, b) => Math.max(a, b), 0);

  answer = Distance.filter((num) => num === maxDistance).length;

  return answer;
}
