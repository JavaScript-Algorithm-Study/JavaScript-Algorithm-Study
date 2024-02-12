class Node {
  cnt = 0;
  child = {};
}
class Trie {
  constructor() {
    this.root = new Node();
  }
  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.child[char]) {
        node.child[char] = new Node();
      }
      node.cnt++;
      node = node.child[char];
    }
    node.cnt++;
    node.isWord = true;
  }
  search(word) {
    let node = this.root;
    let len = 0;
    for (const char of word) {
      node = node.child[char];
      len += 1;
      if (node.cnt <= 1) {
        break;
      }
    }
    return len;
  }
}
function solution(words) {
  const trie = new Trie();
  words.forEach((word) => trie.insert(word));
  return words.reduce((sum, now) => sum + trie.search(now), 0);
}
