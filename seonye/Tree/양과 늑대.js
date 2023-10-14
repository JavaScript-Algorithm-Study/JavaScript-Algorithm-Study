/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/92343
난이도 : Level 3

1. 문제 설명
2진 트리 모양 초원의 각 노드에 늑대와 양이 한 마리씩 놓여 있다.
루트 노드에 출발하여 각 노드를 돌아다니며 양을 모은다.
각 노드를 방문할 때 마다 해당 노드에 있던 양과 늑대가 따라오게됨
늑대는 양을 잡아먹을 기회를 노리고 있고, 양의 수보다 늑대의 수가 같거나 많아지면 바로 모든 양을 잡아먹어 버림
중간에 양이 늑대에게 잡아먹히지 않도록 최대한 많은 수의 양을 모아서 다시 루트 노드로 돌아오려 한다.

2. 풀이
edges배열을 0번째 원소 기준으로 오름차순으로 정렬을 해준다음, 루트 노드 부터 왼쪽 오른쪽 순서대로 넣어 주었다.
이후에 자식 노드의 추가편리를 위해 children배열에 노드의 번호를 인덱스로 하여 넣어주었다.

양부터 우선순위 큐를 적용해야하나?

일단 info 길이가 최대 17이라서 양인경우 unshift로 앞에 추가해주고
늑대인 경우 push로 뒤에 추가해줘서 양을 먼저 반영하게 했는데.. 실패!

실패 (총 테케 18)
실패 7
시간초과 2, 11, 12, 13, 14, 15, 16, 17
런타임 에러 8, 9

*/

class Node {
  constructor(data, info) {
    this.data = data;
    this.isSheep = info === 0 ? true : false;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(rootInfo) {
    this.root = new Node(0, rootInfo);
    this.children = [this.root];
  }
  appendNode([parent, child], childInfo) {
    const parentNode = this.children[parent];
    const childNode = new Node(child, childInfo);
    if (parentNode.left == null) parentNode.left = childNode;
    else parentNode.right = childNode;

    this.children[child] = childNode;
  }
}

function solution(info, edges) {
  let answer = 0;
  const tree = new Tree(info[0]);
  const edgeSort = edges.sort((a, b) => a[0] - b[0]);
  edgeSort.forEach((edge, i) => {
    tree.appendNode(edge, info[edge[1]]);
  });
  let sheepCnt = 0;
  let wolfCnt = 0;
  let visited = [];
  let needVisit = [];
  needVisit.push(tree.root);

  function pushNeedVisit(node) {
    if (node.isSheep) needVisit.unshift(node);
    else needVisit.push(node);
  }

  while (needVisit.length) {
    currNode = needVisit.shift();
    console.log('---------------', currNode.data);
    if (!visited.includes(currNode.data)) {
      if (currNode.isSheep) {
        sheepCnt += 1;
        visited.push(currNode.data);
        if (currNode.left) pushNeedVisit(currNode.left);
        if (currNode.right) pushNeedVisit(currNode.right);
      } else {
        if (!currNode.left && !currNode.right) continue;
        if (wolfCnt + 1 >= sheepCnt) {
          if (needVisit.length === 0) break;
          pushNeedVisit(currNode);
        } else {
          visited.push(currNode.data);
          wolfCnt += 1;
          if (currNode.right) needVisit.unshift(currNode.right);
          if (currNode.left) needVisit.unshift(currNode.left);
        }
      }
    } else {
      if (currNode.left) pushNeedVisit(currNode.left);
      if (currNode.right) pushNeedVisit(currNode.right);
    }
    console.log(needVisit);
    console.log(visited);
    console.log(sheepCnt, wolfCnt);
  }

  answer = sheepCnt;
  return answer;
}

const info = [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1];

const edges = [
  [0, 1],
  [1, 2],
  [1, 4],
  [0, 8],
  [8, 7],
  [9, 10],
  [9, 11],
  [4, 3],
  [6, 5],
  [4, 6],
  [8, 9],
];
console.log(solution(info, edges));
