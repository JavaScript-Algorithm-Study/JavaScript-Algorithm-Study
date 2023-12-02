/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/81303
난이도 : Level3

표의 행을 선택, 삭제, 복구하는 프로그램을 작성하는 과제

4, 8, 11, 19, 21, 22, 24, 27  

링크드 리스트 배열로 바꿔보기

0은 [null, 1]
1은 [0, 2]
2는 [1, 3]
3은 [2, 4]
4는 [3, null]


*/
const n = 8;
const k = 2;
const cmd = ['D 2', 'C', 'U 3', 'C', 'D 4', 'C', 'U 2', 'Z', 'Z'];

class Node {
  constructor(data) {
    this.prev = null;
    this.next = null;
    this.data = data;
  }
}

class LinkedList {
  constructor(head = null) {
    this.head = head;
    this.tail = head;
  }

  add(node) {
    if (!this.head) {
      this.head = node;
    } else {
      let cur = this.head;
      while (cur.next) {
        cur = cur.next;
      }
      cur.next = node;
      node.prev = cur;
      this.tail = node;
    }
  }

  find(data) {
    let cur = this.head;
    while (cur) {
      if (cur.data === data) break;
      cur = cur.next;
    }
    return cur;
  }

  insert(data) {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
      return;
    }

    let current = this.head;
    let prev = null;

    while (current && current.data < data) {
      prev = current;
      current = current.next;
    }

    newNode.next = current;
    newNode.prev = prev;

    if (prev) {
      prev.next = newNode;
    } else {
      this.head = newNode;
    }

    if (current) {
      current.prev = newNode;
    }
  }

  printList() {
    let tmp = [];
    let current = this.head;

    while (current) {
      tmp.push(current.data);
      current = current.next;
    }
    return tmp.join(', ');
  }
}

function solution(n, k, cmd) {
  var answer = '';
  let linkList;
  const removeQueue = [];

  for (let i = 0; i < n; i++) {
    let node = new Node(i);
    if (i === 0) {
      linkList = new LinkedList(node);
    } else {
      linkList.add(node);
    }
  }

  let selected = linkList.find(k);

  for (let c of cmd) {
    const [opt, x] = c.split(' ');
    let cur = Number(x);
    switch (opt) {
      case 'U':
        while (cur > 0) {
          if (selected === linkList.head) {
            selected = linkList.tail;
          } else {
            selected = selected.prev;
          }
          cur -= 1;
        }
        break;
      case 'D':
        while (cur > 0) {
          if (selected === linkList.tail) {
            selected = linkList.head;
          } else {
            selected = selected.next;
          }
          cur -= 1;
        }
        break;
      case 'C':
        removeQueue.push(selected);
        const tmp = selected;
        if (tmp === linkList.head) {
          tmp.next.prev = null;
          linkList.head = tmp.next;
          selected = linkList.head;
        } else if (tmp === linkList.tail) {
          tmp.prev.next = null;
          linkList.tail = tmp.prev;
          selected = linkList.tail;
        } else {
          tmp.prev.next = tmp.next;
          tmp.next.prev = tmp.prev;
          selected = tmp.next;
        }
        break;
      case 'Z':
        const recoverNode = removeQueue.pop();
        linkList.insert(recoverNode.data);
        break;
    }
  }

  let cur = linkList.head;
  for (let i = 0; i < n; i++) {
    if (cur.data !== i) answer += 'X';
    else {
      answer += 'O';
      cur = cur.next;
    }
  }
  return answer;
}

console.log(solution(n, k, cmd));
