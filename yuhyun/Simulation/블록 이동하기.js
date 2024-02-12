function solution(board) {
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const movements = [
    ...directions.map(
      ([dr, dc]) =>
        (coords) =>
          coords.map(([r, c]) => [r + dr, c + dc])
    ),
    (coords) => rotate(coords, 0, rotateCounterClockwise90),
    (coords) => rotate(coords, 1, rotateCounterClockwise90),
    (coords) => rotate(coords, 0, rotateClockwise90),
    (coords) => rotate(coords, 1, rotateClockwise90),
  ];

  const N = board.length;
  const robot = [
    [0, 0],
    [0, 1],
  ];
  const target = [N - 1, N - 1];
  return getMin(robot, target, board, movements);
}

function getMin(robot, [targetR, targetC], board, movements) {
  const minMap = new KeyMap((coords) => {
    const copied = coords.map((row) => [...row]);
    copied.sort(([rowA, colA], [rowB, colB]) => rowA - rowB || colA - colB);
    return copied.map((coord) => coord.join(",")).join(" ");
  });

  const isTarget = ([r, c]) => r === targetR && c === targetC;

  const queue = new Queue();
  queue.push(robot);
  minMap.set(robot, 0);

  while (!queue.isEmpty()) {
    const curCoords = queue.pop();
    if (curCoords.some(isTarget)) {
      return minMap.get(curCoords);
    }

    const nextCost = minMap.get(curCoords) + 1;

    movements.forEach((move) => {
      const nextCoords = move(curCoords);
      const nextMinCost = minMap.get(nextCoords) ?? Infinity;
      if (!canMove(curCoords, nextCoords, board) || nextCost >= nextMinCost) {
        return;
      }

      minMap.set(nextCoords, nextCost);
      queue.push(nextCoords);
    });
  }

  return -1;
}

function canMove(coordsBefore, coordsAfter, board) {
  const ROW = board.length;
  const COL = board[0].length;
  if (coordsAfter.some(([r, c]) => outOfRange(r, c, ROW, COL))) {
    return false;
  }

  const { minR, minC, maxR, maxC } = getMinMax([...coordsBefore, ...coordsAfter]);
  for (let row = minR; row < maxR + 1; row += 1) {
    for (let col = minC; col < maxC + 1; col += 1) {
      if (board[row][col] !== 0) {
        return false;
      }
    }
  }

  return true;
}

function getMinMax(coords) {
  let minR, minC, maxR, maxC;
  coords.forEach(([r, c]) => {
    minR = Math.min(minR ?? r, r);
    minC = Math.min(minC ?? c, c);
    maxR = Math.max(maxR ?? r, r);
    maxC = Math.max(maxC ?? c, c);
  });
  return { minR, minC, maxR, maxC };
}

function outOfRange(r, c, R, C) {
  return r < 0 || c < 0 || R <= r || C <= c;
}

function rotate(coords, axis, rotateBoardFn) {
  const AXIS = 1;

  const { minR, minC, maxR, maxC } = getMinMax(coords);

  const board = Array.from(Array(maxR - minR + 1), () => Array(maxC - minC + 1).fill(0));
  const axisR = coords[axis][0] - minR;
  const axisC = coords[axis][1] - minC;
  board[axisR][axisC] = AXIS;

  const rotated = rotateBoardFn(board);

  let axisRAfter, axisCAfter;
  const result = [];
  rotated.forEach((row, rowIndex) =>
    row.forEach((col, colIndex) => {
      const coord = [rowIndex, colIndex];
      if (col === AXIS) {
        [axisRAfter, axisCAfter] = coord;
      }
      result.push(coord);
    })
  );

  return result.map(([r, c]) => [r + minR + (axisR - axisRAfter), c + minC + (axisC - axisCAfter)]);
}

function rotateClockwise90(board) {
  const ROW = board.length;
  const COL = board[0].length;
  const result = Array.from(Array(COL), () => Array(ROW));
  for (let r = 0; r < ROW; r += 1) {
    for (let c = 0; c < COL; c += 1) {
      result[c][ROW - r - 1] = board[r][c];
    }
  }
  return result;
}

function rotateCounterClockwise90(board) {
  const ROW = board.length;
  const COL = board[0].length;
  const result = Array.from(Array(COL), () => Array(ROW));
  for (let r = 0; r < ROW; r += 1) {
    for (let c = 0; c < COL; c += 1) {
      result[COL - c - 1][r] = board[r][c];
    }
  }
  return result;
}

class KeyMap {
  #map = new Map();
  #toKey;

  constructor(toKey = (v) => v) {
    this.#toKey = toKey;
  }

  has(key) {
    return this.#map.has(this.#toKey(key));
  }

  get(key) {
    return this.#map.get(this.#toKey(key));
  }

  set(key, value) {
    return this.#map.set(this.#toKey(key), value);
  }
}

class Queue {
  #queue = [];
  #head = 0;

  push(value) {
    this.#queue.push(value);
  }

  pop() {
    return this.isEmpty() ? null : this.#queue[this.#head++];
  }

  isEmpty() {
    return this.#queue.length === this.#head;
  }
}
