function solution(n, build_frame) {
  const structure = new Structure(n + 1);
  const fns = [
    [
      structure.deletePillar.bind(structure),
      structure.addPillar.bind(structure),
    ],
    [structure.deleteBeam.bind(structure), structure.addBeam.bind(structure)],
  ];

  build_frame
    .map(([x, y, a, b]) => [n - y, x, fns[a][b]])
    .forEach(([row, col, fn]) => fn(row, col));

  const structureArray = structure
    .toArray()
    .map(([row, col, type]) => [col, n - row, type]);

  structureArray.sort(
    ([xA, yA, typeA], [xB, yB, typeB]) => xA - xB || yA - yB || typeA - typeB
  );

  return structureArray;
}

function outOfRange(x, y, X, Y) {
  return x < 0 || y < 0 || X <= x || Y <= y;
}

class Structure {
  static #PILLAR = 0;
  static #BEAM = 1;
  static #DIR = [
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, -1],
  ];

  #n;
  #structure;

  constructor(n) {
    this.#n = n;
    this.#structure = Array.from(Array(n), () =>
      Array.from(Array(n), () => Array(2).fill(false))
    );
  }

  addPillar(row, col) {
    if (this.#isValidPillar(row, col)) {
      this.#structure[row][col][Structure.#PILLAR] = true;
    }
  }

  addBeam(row, col) {
    if (this.#isValidBeam(row, col)) {
      this.#structure[row][col][Structure.#BEAM] = true;
    }
  }

  deletePillar(row, col) {
    this.#delete(row, col, Structure.#PILLAR);
  }

  deleteBeam(row, col) {
    this.#delete(row, col, Structure.#BEAM);
  }

  toArray() {
    const result = [];
    this.#structure.forEach((row, rowIndex) =>
      row.forEach((col, colIndex) =>
        col.forEach(
          (exist, type) => exist && result.push([rowIndex, colIndex, type])
        )
      )
    );
    return result;
  }

  #delete(row, col, type) {
    this.#structure[row][col][type] = false;
    const canDelete = Structure.#DIR
      .map(([dRow, dCol]) => [row + dRow, col + dCol])
      .filter(
        ([nextRow, nextCol]) => !outOfRange(nextRow, nextCol, this.#n, this.#n)
      )
      .every(
        ([nextRow, nextCol]) =>
          (!this.#getSafe(nextRow, nextCol, Structure.#PILLAR) ||
            this.#isValidPillar(nextRow, nextCol)) &&
          (!this.#getSafe(nextRow, nextCol, Structure.#BEAM) ||
            this.#isValidBeam(nextRow, nextCol))
      );

    if (!canDelete) {
      this.#structure[row][col][type] = true;
    }
  }

  #isValidPillar(row, col) {
    return (
      row === this.#n - 1 ||
      this.#getSafe(row + 1, col, Structure.#PILLAR) ||
      this.#getSafe(row, col - 1, Structure.#BEAM) ||
      this.#getSafe(row, col + 1, Structure.#BEAM)
    );
  }

  #isValidBeam(row, col) {
    return (
      this.#getSafe(row + 1, col, Structure.#PILLAR) ||
      this.#getSafe(row + 1, col + 1, Structure.#PILLAR) ||
      (this.#getSafe(row, col - 1, Structure.#BEAM) &&
        this.#getSafe(row, col + 1, Structure.#BEAM))
    );
  }

  #getSafe(row, col, type) {
    return this.#structure?.[row]?.[col]?.[type];
  }
}
