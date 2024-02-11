function solution(n, k, cmd) {
  const stack = [];
  const linkedList = new DoublyLinkedList();
  Array.from(Array(n), (_, i) => i).forEach((num) => linkedList.addLast(num));

  let cursor = linkedList.at(k);

  const up = (x) => {
    while (x) {
      cursor = cursor.prev;
      x -= 1;
    }
  };

  const down = (x) => {
    while (x) {
      cursor = cursor.next;
      x -= 1;
    }
  };

  const cut = () => {
    stack.push(cursor);
    if (cursor.prev) cursor.prev.next = cursor.next;
    if (cursor.next) cursor.next.prev = cursor.prev;
    cursor = cursor.next ? cursor.next : cursor.prev;
  };

  const restore = () => {
    const deleted = stack.pop();
    if (deleted.prev) deleted.prev.next = deleted;
    if (deleted.next) deleted.next.prev = deleted;
  };

  const commandMap = {
    U: up,
    D: down,
    C: cut,
    Z: restore,
  };

  cmd.forEach((command) => {
    const [op, arg1] = command.split(" ");
    commandMap[op](+arg1);
  });

  const result = Array.from(Array(n), () => "O");
  stack.forEach(({ value }) => {
    result[value] = "X";
  });

  return result.join("");
}

class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  addLast(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = this.tail = node;
      return;
    }
    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
  }

  at(k) {
    let cur = this.head;
    while (k) {
      cur = cur.next;
      k -= 1;
    }
    return cur;
  }
}
