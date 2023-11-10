/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/150364

난이도 : Level4

1. 문제
모든 부모노드는 자식 노드와 연결된 간선 중 하나를 길로 설정
 - 실선은 길
 - 점선은 길이아닌 간선
모든 부모 노드는 자신의 자식 노드 중 가장 번호가 작은 노드를 가리키는 간선을 초기 길로 설정

게임 규칙
1. 1번 노드에 1, 2, 3 중 하나를 떨어트림
2. 숫자는 길인 간선을 따라 리프 노드까지 떨어진다.
3. 숫자가 리프 노드에 도착하면, 숫자가 지나간 각 노드는 현재 길로 연결된 자식 노드 다음으로 번호가 큰 자식 노드를 가리키는 간선을 새로운 길로 설정하고 기존의 길은 끊는다.
 - 만약 현재 길로 연결된 노드의 번호가 가장 크면, 번호가 가장 작은 노드를 가리키는 간선을 길로 설정
 - 노드의 간선이 하나라면 계속 하나의 간선을 길로 설정
4. 원하는 만큼 계속해서 루트 노드에 숫자를 떨어트릴 수 있다.
 - 단, 앞서 떨어트린 숫자가 리프 노드까지 떨어진 후에 새로운 숫자를 떨어트려야 한다.

목표
각각의 리프 노드에 쌓인 숫자의 합을 target에서 가리키는 값과 같게 만든다.
가장 적은 숫자를 사용하며 그중 사전 순으로 가장 빠른 경우를 출력

2. 풀이



3. 정리
  let graph = new Array(target.length + 1).fill([]);
  fill([])를 사용하면 각 요소가 같은 빈 배열 객체를 참조
  즉, 모든 요소가 같은 배열 객체를 공유

  let graph = Array.from(Array(target.length + 1), () => []);
  Array.from()을 사용하여 배열을 생성하고 초기화하는 방법
  target.length + 1의 길이를 가진 배열을 만들고 각 요소는 빈 배열([])로 채움

*/
function solution(edges, target) {
  var answer = [];

  edges.sort((a, b) => a[1] - b[1]);
  let graph = Array.from(Array(target.length + 1), () => []);

  for (let i = 0; i < edges.length; i++) {
    const [parent, child] = edges[i];
    graph[parent].push(child);
  }

  const parentChild = graph[1];
  const children = Array.from(Array(parentChild.length), () => []);

  for (let i = 0; i < parentChild.length; i++) {
    const currParent = parentChild[i];
    const curr = graph[currParent];
    if (curr.length === 0) children[i].push(currParent);
    else {
      while (curr.length > 0) {
        const nextChild = curr.shift();
        const nextChildren = graph[nextChild];
        if (nextChildren.length === 0) children[i].push(nextChild);
        else curr.push(...nextChildren);
      }
    }
  }

  const visited = new Array(children.length).fill(0);

  const visitOrder = [];
  const countDict = {};
  let count = 0;
  let currIndex = 0;

  const maxTarget = Math.max(...target);
  const maxCount = Math.ceil(maxTarget / 3);

  while (count < maxCount) {
    const currChildIndex = visited[currIndex];
    const currLeaf = children[currIndex][currChildIndex];

    visitOrder.push(currLeaf);
    if (!countDict[currLeaf]) countDict[currLeaf] = 1;
    else countDict[currLeaf] += 1;

    if (target[currLeaf - 1] === maxTarget) count += 1;

    visited[currIndex] = (visited[currIndex] + 1) % children[currIndex].length;
    currIndex = (currIndex + 1) % children.length;
  }

  let cardDict = {};

  for (let leafNode in countDict) {
    let count = countDict[leafNode];
    const targetNumber = target[leafNode - 1];
    if (count === 1) cardDict[leafNode] = [targetNumber];
    else if (count > 1 && targetNumber === 1) return [-1];
    else {
      cardDict[leafNode] = new Array(count).fill(1);
      let currSum = 1 * count;
      let index = 0;
      while (currSum !== targetNumber) {
        if (targetNumber - currSum >= 2) {
          cardDict[leafNode][index++] += 2;
          currSum += 2;
        } else {
          cardDict[leafNode][index++] += 1;
          currSum += 1;
        }
        index %= count;
      }
    }
  }

  for (let i = 0; i < visitOrder.length; i++) {
    const curr = visitOrder[i];
    answer.push(cardDict[curr].pop());
  }

  return answer;
}

const edges = [
  [2, 4],
  [1, 2],
  [6, 8],
  [1, 3],
  [5, 7],
  [2, 5],
  [3, 6],
  [6, 10],
  [6, 9],
];
const target = [0, 0, 0, 3, 0, 0, 5, 1, 2, 3];

console.log(solution(edges, target));
