/**
 *       // 자식이 하나밖에 없으면서 현재 val의 node가 words에 없을 때
      if (curNode.len === 1 && curNode.val !== word && !words.includes(curNode.val)) {
        return curNode.val.length;
      }
      이렇게 확인하니깐 시간초과
 */

class Node {
  constructor(val = "") {
    this.val = val;
    this.children = new Map();
    this.len = 0;

    // 해당 단어로 끝나는 단어가 있는지 확인
    this.end = true;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(word) {
    const node = new Node(word);

    let curNode = this.root;

    for (const char of word) {
      if (!curNode.children.has(char)) {
        curNode.children.set(char, new Node(curNode.val + char));
      }
      curNode.len += 1;
      curNode = curNode.children.get(char);
    }
    curNode.end = false;
  }

  len(word) {
    let curNode = this.root;

    for (const char of word) {
      curNode = curNode.children.get(char);

      // 단어가 일치할 때
      if (curNode.val === word) {
        return curNode.val.length;
      }

      // 자식이 하나밖에 없으면서 현재 val의 node가 words에 없을 때
      if (curNode.len === 1 && curNode.end) {
        return curNode.val.length;
      }
    }
  }
}

function solution(words) {
  const trie = new Trie();

  words.forEach((word) => {
    trie.insert(word);
  });

  let minLen = 0;

  words.forEach((word) => {
    minLen += trie.len(word);
  });

  return minLen;
}
