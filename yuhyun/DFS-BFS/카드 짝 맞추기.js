function solution(board, r, c) {
  const [PAIR_A, PAIR_B] = [0, 1];
  const ENTER = 1;

  const UP = [-1, 0];
  const LEFT = [0, 1];
  const DOWN = [1, 0];
  const RIGHT = [0, -1];

  const isEmpty = (col) => {
    return col === 0;
  };

  const createSingleMoveMethod = ([dr, dc]) => {
    return (r, c, board) => {
      const R = board.length;
      const C = board[0].length;

      const nextR = r + dr;
      const nextC = c + dc;

      return outOfRange(nextR, nextC, R, C) ? [[r, c], 0] : [[nextR, nextC], 1];
    };
  };

  const createCtrlMoveMethod = ([dr, dc]) => {
    return (r, c, board) => {
      const R = board.length;
      const C = board[0].length;

      let curR = r;
      let curC = c;
      let moved = false;

      while (true) {
        const nextR = curR + dr;
        const nextC = curC + dc;

        if (outOfRange(nextR, nextC, R, C)) {
          break;
        }

        curR = nextR;
        curC = nextC;
        moved = true;

        if (!isEmpty(board[nextR][nextC])) {
          break;
        }
      }

      return [[curR, curC], moved ? 1 : 0];
    };
  };

  const moveMethods = [
    createSingleMoveMethod(UP),
    createSingleMoveMethod(LEFT),
    createSingleMoveMethod(DOWN),
    createSingleMoveMethod(RIGHT),
    createCtrlMoveMethod(UP),
    createCtrlMoveMethod(LEFT),
    createCtrlMoveMethod(DOWN),
    createCtrlMoveMethod(RIGHT),
  ];

  const createCardMap = (board) => {
    const result = new Map();
    board.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (isEmpty(col)) {
          return;
        }

        const curCardPosition = [rowIndex, colIndex];
        const cardsPosition = result.get(col) ?? [];
        result.set(col, [...cardsPosition, curCardPosition]);
      });
    });
    return result;
  };

  const calcShortestPath = ([fromR, fromC], [toR, toC], board) => {
    const R = board.length;
    const C = board[0].length;

    const queue = createQueue();
    const minDistance = Array.from(Array(R), () => Array(C).fill(Infinity));

    queue.enqueue([fromR, fromC]);
    minDistance[fromR][fromC] = 0;

    while (!queue.isEmpty()) {
      const [curR, curC] = queue.dequeue();
      const curDistance = minDistance[curR][curC];

      if (isSamePosition([curR, curC], [toR, toC])) {
        break;
      }

      moveMethods.forEach((move) => {
        const [[nextR, nextC], distance] = move(curR, curC, board);
        const nextDistance = curDistance + distance;

        if (nextDistance >= minDistance[nextR][nextC]) {
          return;
        }

        minDistance[nextR][nextC] = nextDistance;
        queue.enqueue([nextR, nextC]);
      });
    }

    return minDistance[toR][toC];
  };

  const createCardOrders = (orderPermutations, cardMap) => {
    const dfs = (level, order, history, result) => {
      if (level === order.length) {
        result.push([...history]);
        return;
      }

      const card = cardMap.get(order[level]);
      history.push(card[PAIR_A], card[PAIR_B]);
      dfs(level + 1, order, history, result);
      history.pop();
      history.pop();

      history.push(card[PAIR_B], card[PAIR_A]);
      dfs(level + 1, order, history, result);
      history.pop();
      history.pop();
    };

    return orderPermutations.flatMap((order) => {
      const result = [];
      dfs(0, order, [], result);
      return result;
    }, 1);
  };

  const traverse = (startR, startC, order, board) => {
    let fromR = startR;
    let fromC = startC;
    const copiedBoard = board.map((row) => [...row]);

    const step = ([toR, toC]) => {
      const matched =
        !isSamePosition([toR, toC], [fromR, fromC]) &&
        board[toR][toC] === board[fromR][fromC];

      const distance = calcShortestPath(
        [fromR, fromC],
        [toR, toC],
        copiedBoard
      );

      if (matched) {
        copiedBoard[fromR][fromC] = copiedBoard[toR][toC] = 0;
      }

      fromR = toR;
      fromC = toC;

      return matched ? ENTER + distance + ENTER : distance;
    };

    const sum = (acc, cur) => acc + cur;

    return order.map(step).reduce(sum, 0);
  };

  const cardMap = createCardMap(board);
  const nCard = cardMap.size;
  const cardOrders = createCardOrders(
    getPermutations([...cardMap.keys()], nCard),
    cardMap
  );

  return Math.min(...cardOrders.map((order) => traverse(r, c, order, board)));
}

function outOfRange(r, c, R, C) {
  return r < 0 || c < 0 || R <= r || C <= c;
}

function getPermutations(array, nPick) {
  if (nPick === 1) {
    return array.map((value) => [value]);
  }

  return array.flatMap((value, index) => {
    const permutations = getPermutations(
      array.filter((_, i) => i !== index),
      nPick - 1
    );
    return permutations.map((permutation) => [value, ...permutation]);
  }, 1);
}

function createQueue() {
  let head = 0;
  const queue = [];

  const enqueue = (value) => {
    queue.push(value);
  };

  const dequeue = () => {
    const value = queue[head];
    head += 1;
    return value;
  };

  const isEmpty = () => {
    return queue.length - head === 0;
  };

  return { enqueue, dequeue, isEmpty };
}

function isSamePosition([r1, c1], [r2, c2]) {
  return r1 === r2 && c1 === c2;
}
