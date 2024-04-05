//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
2
7
3 1 3 7 3 4 6
8
1 2 3 4 5 6 7 8
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

function solution(students) {
  const visited = Array(students.length).fill(false);
  const complete = Array(students.length).fill(false);
  let result = students.length - 1;

  const dfs = (now) => {
    visited[now] = true;

    const next = students[now];
    if (!visited[next]) dfs(next);
    else if (!complete[next]) {
      result--;
      for (let i = next; i !== now; i = students[i]) {
        result--;
      }
    }

    complete[now] = true;
  };

  students.slice(1).forEach((_, idx) => {
    if (visited[idx + 1]) return;
    dfs(idx + 1);
  });

  return result;
}

const T = +input();
let result = "";

for (let i = 0; i < T; i++) {
  const n = +input();
  const students = input();
  students.unshift("");
  result += `${solution(students)}\n`;
}

console.log(result);

// 1 3 3
// 2 1 3 3
// 3 3
// 4 7 6 4
// 5 3 3
//

// 유니온 파인드로
// 1 3 3
// 2 1
