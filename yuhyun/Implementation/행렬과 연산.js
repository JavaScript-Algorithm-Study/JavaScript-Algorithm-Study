function solution(rc, operations) {
  const firstColumns = new Deque();
  const lastColumns = new Deque();
  const middleRows = new Deque();

  rc.forEach((row) => {
    const { length } = row;
    firstColumns.addLast(row[0]);
    lastColumns.addLast(row.at(-1));

    const deque = new Deque();
    for (let index = 1; index < length - 1; index += 1) {
      deque.addLast(row[index]);
    }
    middleRows.addLast(deque);
  });

  const shiftRow = () => {
    firstColumns.addFirst(firstColumns.removeLast());
    lastColumns.addFirst(lastColumns.removeLast());
    middleRows.addFirst(middleRows.removeLast());
  };

  const rotate = () => {
    middleRows.first().addFirst(firstColumns.removeFirst());
    lastColumns.addFirst(middleRows.first().removeLast());
    middleRows.last().addLast(lastColumns.removeLast());
    firstColumns.addLast(middleRows.last().removeFirst());
  };

  const fns = {
    ShiftRow: shiftRow,
    Rotate: rotate,
  };

  operations.forEach((operation) => fns[operation]());

  const result = [];
  while (!firstColumns.isEmpty()) {
    const row = [];
    row.push(firstColumns.removeFirst());

    const middleRow = middleRows.removeFirst().toArray();
    if (middleRow.length) {
      row.push(...middleRow);
    }

    row.push(lastColumns.removeFirst());
    result.push(row);
  }

  return result;
}

class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class Deque {
  head;
  tail;
  size = 0;

  addFirst(value) {
    if (this.isEmpty()) {
      this.addLast(value);
      return;
    }

    const node = new Node(value);
    this.head.prev = node;
    node.next = this.head;
    this.head = node;
    this.size += 1;
  }

  addLast(value) {
    const node = new Node(value);
    if (this.isEmpty()) {
      this.head = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
    }

    this.tail = node;
    this.size += 1;
  }

  removeFirst() {
    if (this.isEmpty()) {
      return null;
    }

    if (this.size === 1) {
      return this.removeLast();
    }

    const value = this.head.value;
    this.head.prev = null;
    this.head = this.head.next;
    this.size -= 1;
    return value;
  }

  removeLast() {
    if (this.isEmpty()) {
      return null;
    }

    const value = this.tail.value;
    if (this.size === 1) {
      this.head = this.tail = undefined;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    this.size -= 1;
    return value;
  }

  first() {
    return this.head?.value;
  }

  last() {
    return this.tail?.value;
  }

  isEmpty() {
    return this.size === 0;
  }

  toArray() {
    let cur = this.head;
    const result = [];
    while (cur) {
      result.push(cur.value);
      cur = cur.next;
    }
    return result;
  }
}
