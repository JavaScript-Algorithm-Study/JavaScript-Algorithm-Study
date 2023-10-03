function solution(cacheSize, cities) {
  const HIT = 1;
  const MISS = 5;

  if (cacheSize === 0) {
    return cities.length * MISS;
  }

  let result = 0;
  const cache = new DoublyLinkedList();

  cities
    .map((city) => city.toLowerCase())
    .forEach((city) => {
      const isHit = cache.remove(city);

      if (isHit) {
        cache.addLast(city);
        result += HIT;
        return;
      }

      if (cache.length() >= cacheSize) {
        cache.removeFirst();
      }

      cache.addLast(city);
      result += MISS;
    });

  return result;
}

function Node(value) {
  this.value = value;
  this.prev = null;
  this.next = null;
}

class DoublyLinkedList {
  #head = null;
  #tail = null;
  #size = 0;

  addLast(value) {
    const newNode = new Node(value);

    if (this.isEmpty()) {
      this.#head = newNode;
    } else {
      newNode.prev = this.#tail;
      this.#tail.next = newNode;
    }

    this.#tail = newNode;
    this.#size += 1;
  }

  remove(value) {
    let cur = this.#head;

    while (cur) {
      if (cur.value === value) {
        break;
      }

      cur = cur.next;
    }

    if (!cur) {
      return false;
    }

    const prevNode = cur.prev;
    const nextNode = cur.next;

    if (prevNode) {
      prevNode.next = nextNode;
    }

    if (nextNode) {
      nextNode.prev = prevNode;
    }

    if (cur === this.#head) {
      this.#head = nextNode;
    }

    if (cur === this.#tail) {
      this.#tail = prevNode;
    }

    this.#size -= 1;
    return true;
  }

  removeFirst() {
    if (this.isEmpty()) {
      return false;
    }

    const nextNode = this.#head.next;
    if (nextNode) {
      nextNode.prev = null;
    }
    this.#head = nextNode;
    this.#size -= 1;
    return true;
  }

  isEmpty() {
    return this.#size === 0;
  }

  length() {
    return this.#size;
  }
}
