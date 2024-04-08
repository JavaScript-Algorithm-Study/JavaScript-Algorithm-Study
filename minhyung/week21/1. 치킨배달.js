//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
5 1
1 2 0 2 1
1 2 0 2 1
1 2 0 2 1
1 2 0 2 1
1 2 0 2 1
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ")))();

const BOARD = {
  EMPTY: "0",
  HOME: "1",
  CHICKEN_STORE: "2",
};

function getCombination(choose, max, now = 0, result = [], tmp = []) {
  if (tmp.length === choose) {
    result.push(tmp);
    return result;
  }
  for (let i = now; i < max; i++) {
    getCombination(choose, max, i + 1, result, [...tmp, i]);
  }
  return result;
}

function findHomeAndStorePositions(board) {
  const chickenStorePositions = [];
  const homePositions = [];

  board.forEach((row, rowIdx) => {
    row.forEach((col, colIdx) => {
      if (col === BOARD.HOME) {
        homePositions.push([rowIdx, colIdx]);
      }
      if (col === BOARD.CHICKEN_STORE) {
        chickenStorePositions.push([rowIdx, colIdx]);
      }
    });
  });

  return [homePositions, chickenStorePositions];
}

function calcDistanceBetweenPosition(positionA, positionB) {
  const [r1, c1] = positionA;
  const [r2, c2] = positionB;
  return Math.abs(r1 - r2) + Math.abs(c1 - c2);
}
function findSmallestDistance(homePositions, chickenStorePositions, positionCombinations) {
  let smallestDistance = Infinity;

  // 치킨집 조합 순환
  positionCombinations.forEach((combination) => {
    let homeDistanceSum = 0;
    const nowChickenStorePositions = combination.map((order) => chickenStorePositions[order]);

    // 집 * 현재 선택된 조합
    homePositions.forEach((homePosition) => {
      let nowHomeMinDistance = Infinity;

      nowChickenStorePositions.forEach((chickenStorePosition) => {
        const betweenDistance = calcDistanceBetweenPosition(chickenStorePosition, homePosition);
        nowHomeMinDistance = Math.min(nowHomeMinDistance, betweenDistance);
      });

      homeDistanceSum += nowHomeMinDistance;
    });

    smallestDistance = Math.min(smallestDistance, homeDistanceSum);
  });

  return smallestDistance;
}
function solution(maxChickenStoreNum, board) {
  const [homePositions, chickenStorePositions] = findHomeAndStorePositions(board);
  const positionCombinations = getCombination(maxChickenStoreNum, chickenStorePositions.length);
  return findSmallestDistance(homePositions, chickenStorePositions, positionCombinations);
}

const [N, M] = input().map(Number);
const board = Array.from({ length: N }, () => input());
console.log(solution(M, board));

// 0: 빈칸, 1: 집, 2: 치킨집
// 치킨거리 = 집과 가장 가까운 치킨집 사이 거리
// 각각 집은 치킨거리를 가지고 있음
// 도시의 치킨거리 = 모든 집의 치킨거리의 합
// 치킨집 최대 M개 글라서 도시의 치킨거리가 가장 작게 되는지?
// 조합으로 구하면 될것같음 ->
// 집 개수 최대 100개, 치킨집 최대 13개
// 치킨집의 조합을 구하고, 집 * 조합을 하면서 최소값을 구함
// 100 * 2^13 * 13
