function preorder(tree) {
  if (!tree) {
    return [];
  }

  const leftTree = preorder(tree.left);
  const rightTree = preorder(tree.right);

  return [tree.data, ...leftTree, ...rightTree];
}

function postorder(tree) {
  if (!tree) {
    return [];
  }

  const leftTree = postorder(tree.left);
  const rightTree = postorder(tree.right);

  return [...leftTree, ...rightTree, tree.data];
}

class Tree {
  constructor(data, x) {
    this.data = data;
    this.x = x;
    this.left = null;
    this.right = null;
  }

  insert(data, x) {
    if (x < this.x) {
      this.insertLeft(data, x);
    } else {
      this.insertRight(data, x);
    }
  }

  insertLeft(data, x) {
    if (this.left) {
      this.left.insert(data, x);
    } else {
      this.left = new Tree(data, x);
    }
  }

  insertRight(data, x) {
    if (this.right) {
      this.right.insert(data, x);
    } else {
      this.right = new Tree(data, x);
    }
  }
}

function solution(nodeinfo) {
  nodeinfo = nodeinfo.map((ele, idx) => [ele[0], ele[1], idx + 1]);
  nodeinfo.sort((a, b) => b[1] - a[1]);

  const tree = new Tree(nodeinfo[0][2], nodeinfo[0][0]); // 루트 노드

  for (let i = 1; i < nodeinfo.length; i++) {
    tree.insert(nodeinfo[i][2], nodeinfo[i][0]);
  }

  const pre = preorder(tree);
  const post = postorder(tree);

  return [pre, post];
}
