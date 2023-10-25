/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/42626
난이도 : Level 2

1. 문제 설명
모든 음식의 스코빌 지수를 K 이상으로 만들기
스코빌 지수가 가장 낮은 두개의 음식을 섞자
섞은 음식의 스코빌 지수 = 맵지 않은 음식의 스코빌 지수 + (두 번째로 맵지 않은 음식의 스코빌 지수 * 2)

모든 음식의 스코빌 지수가 K 이상이 될 때까지 반복하여 섞는다.

2. 풀이
최소힙에 스코빌 지수를 넣고, 최소힙 peek이 K 이상일 때까지 두 개의 음식을 섞어서 다시 최소힙에 넣어준다.

1,3,8,14
*/
class Heap {
  constructor() {
    this.heap = [];
  }

  getLeftChildIndex = (parentIndex) => parentIndex * 2 + 1;
  getRightChildIndex = (parentIndex) => parentIndex * 2 + 2;
  getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2);

  peek = () => this.heap[0];

  insert = (key, value) => {
    const node = { key, value };
    this.heap.push(node);
    this.heapifyUp();
  };

  heapifyUp = () => {
    let index = this.heap.length - 1;
    const lastInsertedNode = this.heap[index];

    while (index > 0) {
      const parentIndex = this.getParentIndex(index);

      if (this.heap[parentIndex].key > lastInsertedNode.key) {
        this.heap[index] = this.heap[parentIndex];
        index = parentIndex;
      } else break;
    }

    this.heap[index] = lastInsertedNode;
  };

  remove = () => {
    const count = this.heap.length;
    const rootNode = this.heap[0];

    if (count <= 0) return undefined;
    if (count === 1) this.heap = [];
    else {
      this.heap[0] = this.heap.pop();
      this.heapifyDown();
    }

    return rootNode;
  };

  heapifyDown = () => {
    let index = 0;
    const count = this.heap.length;
    const rootNode = this.heap[index];

    while (this.getLeftChildIndex(index) < count) {
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);
      const smallerChildIndex =
        rightChildIndex < count && this.heap[rightChildIndex].key < this.heap[leftChildIndex].key
          ? rightChildIndex
          : leftChildIndex;

      if (this.heap[smallerChildIndex].key <= rootNode.key) {
        this.heap[index] = this.heap[smallerChildIndex];
        index = smallerChildIndex;
      } else break;
    }

    this.heap[index] = rootNode;
  };
}

const scoville = [1, 2, 3, 9, 10, 12];
const K = 7;

function solution(scoville, K) {
  let answer = 0;
  const heap = new Heap();
  for (let i = 0; i < scoville.length; i++) {
    heap.insert(scoville[i], scoville[i]);
  }
  while (heap.peek().value < K) {
    const food1 = heap.remove().value;
    const food2 = heap.remove().value;
    const newfood = food1 + food2 * 2;

    heap.insert(newfood, newfood);
    answer += 1;

    if (heap.heap.length === 1) break;
  }

  if (heap.peek().value < K) answer = -1;

  return answer;
}

console.log(solution(scoville, K));
