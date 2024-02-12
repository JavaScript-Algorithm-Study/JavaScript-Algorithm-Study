function solution(board) {
  const blockBoard = new BlockBoard(board);
  const blockEmptyCoords = new Map(
    blockBoard.getBlocks().map((block) => [block, getEmptyCoords(blockBoard.getBlockCoord(block))])
  );

  const nBlock = blockBoard.countBlock();

  let prevNBlock = nBlock;
  while (blockBoard.countBlock()) {
    blockEmptyCoords.forEach((emptyCoords, block) => {
      const blacks = emptyCoords.map(([_, c]) => blockBoard.dropBlack(c)).filter((coord) => coord);

      const canDelete = emptyCoords.every(([r, c]) => {
        const cell = blockBoard.getCell(r, c);
        return cell === block || cell === BlockBoard.BLACK;
      });

      blacks.forEach(([r, c]) => blockBoard.deleteCell(r, c));
      if (canDelete) {
        blockBoard.deleteBlock(block);
        blockEmptyCoords.delete(block);
      }
    });

    if (prevNBlock === blockBoard.countBlock()) {
      break;
    }
    prevNBlock = blockBoard.countBlock();
  }

  return nBlock - blockEmptyCoords.size;
}

class BlockBoard {
  static EMPTY = 0;
  static BLACK = -1;
  #width;
  #height;
  #board;
  #minRows;
  #blocks;

  constructor(board) {
    this.#board = board;
    this.#height = board.length;
    this.#width = board[0].length;
    this.#init();
  }

  getBlocks() {
    return [...this.#blocks.keys()];
  }

  getBlockCoord(block) {
    return this.#blocks.get(block);
  }

  getMinRow(col) {
    return this.#minRows[col];
  }

  dropBlack(col) {
    const minRow = this.#minRows[col];
    if (minRow === 0) {
      return null;
    }

    this.#board[minRow - 1][col] = BlockBoard.BLACK;
    this.#updateMinRow(col);
    return [minRow - 1, col];
  }

  deleteCell(row, col) {
    this.#board[row][col] = BlockBoard.EMPTY;
    this.#updateMinRow(col);
  }

  countBlock() {
    return this.#blocks.size;
  }

  deleteBlock(block) {
    const coords = this.#blocks.get(block);
    coords.forEach(([r, c]) => this.deleteCell(r, c));
    this.#blocks.delete(block);
  }

  getCell(r, c) {
    return this.#board[r][c];
  }

  #init() {
    this.#minRows = Array(this.#width).fill(this.#height);
    this.#board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell !== BlockBoard.EMPTY) {
          this.#minRows[colIndex] = Math.min(this.#minRows[colIndex], rowIndex);
        }
      });
    });

    this.#blocks = new Map();
    this.#board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === BlockBoard.EMPTY) {
          return;
        }

        const block = cell;
        if (!this.#blocks.has(block)) {
          this.#blocks.set(block, []);
        }
        this.#blocks.get(block).push([rowIndex, colIndex]);
      });
    });
  }

  #updateMinRow(col) {
    let row = 0;
    while (row < this.#height && this.#board[row][col] === BlockBoard.EMPTY) {
      row += 1;
    }
    this.#minRows[col] = row;
  }
}

function getEmptyCoords(coords) {
  const { minR, minC, maxR, maxC } = getMinMax(coords);
  const result = [];
  for (let r = minR; r < maxR + 1; r += 1) {
    for (let c = minC; c < maxC + 1; c += 1) {
      const notInCoords = coords.every(([curR, curC]) => curR !== r || curC !== c);
      if (notInCoords) {
        result.push([r, c]);
      }
    }
  }
  return result;
}

function getMinMax(coords) {
  let minR, minC, maxR, maxC;
  coords.forEach(([r, c]) => {
    minR = Math.min(r, minR ?? r);
    minC = Math.min(c, minC ?? c);
    maxR = Math.max(r, maxR ?? r);
    maxC = Math.max(c, maxC ?? c);
  });
  return { minR, minC, maxR, maxC };
}
