/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/72415
난이도 : Level 3


1. 문제 설명
카드 16장이 뒷면을 위로하여 4x4 크기의 격자 형태로 표시되어 있다.
카드 앞면 : 프렌즈 캐릭터 그림, 8가지의 캐릭터 그림이 각각 2장씩 무작위 배치
유저가 카드를 2장 선택하여 앞면으로 뒤집었을 때 같은 그림이 그려진 카드면 카드 사라짐
같은 그림이 아니면 다시 뒷면이 보이도록 뒤집어짐
이 방법으로 모든 카드를 화면에서 사라지게 하면 게임이 종료

- 카드를 커서를 이용해서 선택
- 커서는 방향키로 1칸 이동하거나 Ctrl키를 누른 상태에서 방향키를 누르면
누른 키 방향에 있는 가장 가까운 카드로 한번에 이동, 만약 해당 방향에 카드가 하나도 없다면 그 방향의 가장 마지막 칸으로 이동
만약, 누른 키 방향으로 이동 가능한 카드 또는 빈공간이 없다면 커서는 움직이지 않는다
- 커서가 위치한 카드를 뒤집을 때는 Enter를 입력
앞면이 보이는 카드가 1장 뿐이라면 그림이 맞출 수 없으므로 두번 째 카드를 뒤집을 때까지 앞면을 유지

카드의 짝을 맞춰 몇 장 제거된 상태에서 카드 앞면의 그림을 알고 있다면, 남은 카드를 모두 제거하는데 필요한 키 조작 횟수의 최솟값을 구하려 함
방향키, Ctrl+방향키, Enter 각각 횟수 1로 계산

입력
현재 카드가 놓인 상태를 나타내는 2차원 배열 board
커서의 처음 위치

2. 풀이
*/
const board = [
  [1, 0, 0, 3],
  [2, 0, 0, 0],
  [0, 0, 0, 2],
  [3, 0, 1, 0],
];

const r = 1;
const c = 1;

function solution(board, r, c) {
  var answer = 0;
  let visited = Array.from({ length: 4 }, () => new Array(4).fill(false));
  const cards = new Set();
  const cardPos = {};
  const cardOrder = [];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] !== 0) {
        let cardNum = board[i][j];
        cards.add(cardNum);
        cardPos[cardNum] = cardPos[cardNum] || [];
        cardPos[cardNum].push([i, j]);
      }
    }
  }
  console.log(cardPos);

  function permutation(arr) {
    if (arr.length === cards.size) {
      cardOrder.push(arr);
      return;
    }
    for (c of cards) {
      if (!arr.includes(c)) permutation([...arr, c]);
    }
  }
  permutation([]);

  console.log(cardOrder);

  return answer;
}
console.log(solution(board, r, c));
