function solution(phone_book) {
  const trie = new Trie();

  for (const phone of phone_book) {
    if (trie.checkPrefix(phone)) {
      return false;
    }
    trie.add(phone);
  }

  return true;
}

class Node {
  constructor(value) {
    this.value = value;
    this.children = new Map();
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new Node("");
  }

  add(word) {
    let cur = this.root;
    for (const char of word) {
      if (!cur.children.has(char)) {
        cur.children.set(char, new Node(char));
      }
      cur = cur.children.get(char);
    }
    cur.isEnd = true;
  }

  checkPrefix(word) {
    let cur = this.root;
    for (const char of word) {
      if (cur.isEnd) {
        return true;
      }

      if (!cur.children.has(char)) {
        return false;
      }

      cur = cur.children.get(char);
    }
    return true;
  }
}
