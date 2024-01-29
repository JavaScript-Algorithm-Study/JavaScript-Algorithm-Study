// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/60060
// 풀이날짜: 2024.01.28

class Node {
  constructor() {
    this.cnt = 0;
    this.child = {};
  }
}
class Trie {
  constructor() {
    this.rootNode = {};
  }

  insert(string) {
    if (!this.rootNode[string.length]) {
      this.rootNode[string.length] = new Node();
    }
    let nowNode = this.rootNode[string.length];
    for (const str of string) {
      if (!nowNode.child[str]) {
        nowNode.child[str] = new Node(nowNode.value + str);
      }
      nowNode.cnt++;
      nowNode = nowNode.child[str];
    }
  }
  search(string) {
    if (!this.rootNode[string.length]) {
      return 0;
    }

    let nowNode = this.rootNode[string.length];

    for (const str of string) {
      if (str === "?") return nowNode.cnt;
      if (!nowNode.child[str]) return 0;
      nowNode = nowNode.child[str];
    }

    return 0;
  }
}

function solution(words, queries) {
  const forwardTrie = new Trie();
  const reverseTrie = new Trie();

  const reverseStr = (str) => [...str].reverse().join("");

  words.forEach((word) => {
    forwardTrie.insert(word);
    reverseTrie.insert(reverseStr(word));
  });

  return queries.map((query) => (query[0] === "?" ? reverseTrie.search(reverseStr(query)) : forwardTrie.search(query)));
}

function reverseStr(str) {
  return [...str].reverse().join("");
}
