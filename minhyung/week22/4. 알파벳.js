//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
2 4
CAAB
ADCB
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++]))();

const ALPHABET_NUM = 26;
const ASCII_ALPHABET_UPPER_START = 65;

function isOutOfBoard(board, y, x) {
  return board?.[y]?.[x] === undefined;
}

function getIndexOfCharArray(char) {
  return char?.charCodeAt() - ASCII_ALPHABET_UPPER_START;
}

function solution(R, C, board) {
  // prettier-ignore
  const move = [[1,0], [0,1], [-1,0], [0,-1]];
  const visited = Array(ALPHABET_NUM).fill(false);
  let result = 0;

  const travel = (y, x, size) => {
    result = Math.max(result, size);

    for (let i = 0; i < 4; i++) {
      const [moveY, moveX] = move[i];

      const [nextY, nextX] = [y + moveY, x + moveX];
      const nextChar = board?.[nextY]?.[nextX];
      const nextCharIndex = getIndexOfCharArray(nextChar);

      if (isOutOfBoard(board, nextY, nextX)) continue;
      if (visited[nextCharIndex]) continue;

      visited[nextCharIndex] = true;
      travel(nextY, nextX, size + 1);
      visited[nextCharIndex] = false;
    }
  };

  visited[getIndexOfCharArray(board[0][0])] = true;

  travel(0, 0, 1);

  return result;
}

const [R, C] = input().split(" ").map(Number);
const board = Array.from({ length: R }, () => input().split(""));
console.log(solution(R, C, board));

// // 상하좌우 이동가능
// // 지나간 모든 칸에 적혀있는 알파벳과는 달라야함
// bfs = 메모리 초과
// 오브젝트나 set 쓰면 시간초과
