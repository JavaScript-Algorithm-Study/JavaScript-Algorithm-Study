const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [V, E] = input.shift().split(" ").map(Number);

class UnionFind {
  constructor(n) {
    this.set = Array.from(Array(n + 1), (_, index) => index);
  }

  find(index) {
    if (this.set[index] === index) {
      return index;
    }
    return (this.set[index] = this.find(this.set[index]));
  }

  isSame(x, y) {
    if (this.find(x) === this.find(y)) {
      return true;
    }
    return false;
  }

  union(x, y) {
    const pX = this.find(x);
    const pY = this.find(y);
    this.set[pX] = pY;
  }
}

const u = new UnionFind(V);

const vArr = input.map((ele) => ele.split(" ").map(Number)).sort((a, b) => a[2] - b[2]);

let answer = 0;

vArr.forEach(([start, end, cost]) => {
  if (u.find(start) === u.find(end)) {
    return;
  }
  answer += cost;
  u.union(start, end);
});

console.log(answer);
