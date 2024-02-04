class Node {
  constructor(val = "") {
    this.val = val;
    this.children = new Map();
    this.count = 0;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(word) {
    // word 길이 Trie가 없을 때
    if (!this.root.children.has(word.length)) {
      this.root.children.set(word.length, new Node(word.length));
    }

    let curNode = this.root.children.get(word.length);

    for (const char of word) {
      if (!curNode.children.has(char)) {
        curNode.children.set(char, new Node(curNode.val + char));
      }
      curNode.count++;
      curNode = curNode.children.get(char);
    }
  }

  size(word) {
    let curNode = this.root.children.get(word.length);

    if (!curNode) {
      return 0;
    }

    for (const char of word) {
      if (char === "?") {
        return curNode.count;
      }
      if (!curNode.children.has(char)) {
        return 0;
      }
      curNode = curNode.children.get(char);
    }
  }
}

function solution(words, queries) {
  const answer = [];

  const trie = new Trie();
  const rTrie = new Trie();

  words.forEach((word) => {
    trie.insert(word);
    rTrie.insert(word.split("").reverse().join(""));
  });
  queries.forEach((query) => {
    const count = query.startsWith("?") ? rTrie.size(query.split("").reverse().join("")) : trie.size(query);
    answer.push(count);
  });

  return answer;
}
