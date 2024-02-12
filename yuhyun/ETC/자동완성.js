function solution(words) {
  const trie = new Trie();
  words.forEach((word) => trie.add(word));
  return words.reduce((acc, word) => acc + trie.search(word), 0);
}

class Node {
  constructor(value) {
    this.value = value;
    this.children = new Map();
  }
}

class Trie {
  #root = new Node(0);

  add(word) {
    let cur = this.#root;
    for (const char of word) {
      if (!cur.children.has(char)) {
        cur.children.set(char, new Node(0));
      }
      cur.value += 1;
      cur = cur.children.get(char);
    }
    cur.value += 1;
  }

  search(word) {
    let result = 0;
    let cur = this.#root;
    for (const char of word) {
      if (cur.value === 1) {
        break;
      }
      cur = cur.children.get(char);
      result += 1;
    }
    return result;
  }
}
