/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/42892
난이도 : Level 3

1. 문제 설명
카카오 프렌즈를 두 팀으로 나누고, 각 팀이 같은 곳을 다른 순서로 방문하도록
순회를 마친 팀이 승리


방문할 곳의 2차원 좌표 값을 구하고, 각 장소를 이진트리의 노드가 되로록 구성한 후
순회 방법으로 힌트를 주어 각 팀이 스스로 경로를 찾도록 할 계획

트리 구성 규칙
- 트리 구성 노드의 x, y 좌표 값은 정수
- 모든 노드는 서로 다른 x값을 가진다.
- 같은 레벨에 있는 노드는 같은 y좌표를 가진다.
- 자식 노드의 y 값은 항상 부모 노드보다 작다.
- 임의의 노드 V의 왼쪽 서브 트리에 있는 모든 노드의 x값은 V의 x값보다 작다.
- 임의의 노드 V의 오른쪽 서브 트리에 있는 모든 노드의 x값은 V의 x값보다 크다.

노드들로 구성된 이진트리를 전위 순회, 후위 순회한 결과를 2차원 배열에 순서대로 담아 return

2. 풀이
이차원 배열을 이진트리에 넣은 후, 전위 순회, 후위 순회 하면될 듯
*/
function solution(nodeinfo) {
  let answer = [];
  function pre_order(node) {
    let result = [];
    if (node) {
      result.push(node.data);
      if (node.left) {
        result = [...result, ...pre_order(node.left)];
      }
      if (node.right) {
        result = [...result, ...pre_order(node.right)];
      }
    }

    return result;
  }

  function post_order(node) {
    let result = [];
    if (node) {
      if (node.left) {
        result = [...result, ...post_order(node.left)];
      }
      if (node.right) {
        result = [...result, ...post_order(node.right)];
      }
      result.push(node.data);
    }

    return result;
  }

  class Node {
    constructor(data, pos) {
      this.data = data;
      [this.x, this.y] = pos;
      this.left = null;
      this.right = null;
    }
  }

  class Tree {
    constructor() {
      this.root = null;
    }

    appendNode(node) {
      if (!this.root) return (this.root = node);
      let curr = this.root;
      while (true) {
        if (node.x < curr.x) {
          if (curr.left === null) {
            curr.left = node;
            break;
          } else {
            curr = curr.left;
          }
        } else {
          if (curr.right === null) {
            curr.right = node;
            break;
          } else {
            curr = curr.right;
          }
        }
      }
    }
  }
  const compare = (a, b) => {
    const [x1, y1] = a[1];
    const [x2, y2] = b[1];
    if (y1 !== y2) return y2 - y1;
    else return x1 - x2;
  };
  const dataNodeInfo = nodeinfo.map((_, i) => [i + 1, _]);
  const nodeInfoArray = dataNodeInfo.sort(compare);
  const tree = new Tree();
  for (let i = 0; i < nodeInfoArray.length; i++) {
    const [data, pos] = nodeInfoArray[i];
    const currNode = new Node(data, pos);

    tree.appendNode(currNode);
  }
  answer.push(pre_order(tree.root));
  answer.push(post_order(tree.root));
  return answer;
}
