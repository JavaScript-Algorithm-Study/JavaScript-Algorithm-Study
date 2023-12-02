function solution(commands) {
  const PAD = 1;
  const ROW = 50;
  const COLUMN = 50;

  const values = Array((ROW + PAD) * (COLUMN * PAD)).fill(null);

  const parent = Array.from(Array((ROW + PAD) * (COLUMN * PAD)), (_, i) => i);

  const find = (child) => {
    return parent[child] === child
      ? parent[child]
      : (parent[child] = find(parent[child]));
  };

  const union = (childA, childB) => {
    const parentA = find(childA);
    const parentB = find(childB);
    if (parentA === parentB) {
      return;
    }

    parent[parentB] = parentA;
  };

  const updateCell = (r, c, value) => {
    const index1D = to1DArrayIndex(r, c, ROW + PAD);
    const parentIndex = find(index1D);
    values[parentIndex] = value;
  };

  const updateValue = (oldValue, newValue) => {
    for (let index = 0; index < values.length; index += 1) {
      const parentIndex = find(index);
      const curValue = values[parentIndex];
      if (curValue === oldValue) {
        values[parentIndex] = newValue;
      }
    }
  };

  const merge = (rA, cA, rB, cB) => {
    const indexA1D = to1DArrayIndex(rA, cA, ROW + PAD);
    const parentAIndex = find(indexA1D);
    const valueA = values[parentAIndex];

    const indexB1D = to1DArrayIndex(rB, cB, ROW + PAD);
    const parentBIndex = find(indexB1D);

    if (valueA) {
      union(parentAIndex, parentBIndex);
      return;
    }

    union(parentBIndex, parentAIndex);
  };

  const unmerge = (r, c) => {
    const index1D = to1DArrayIndex(r, c, ROW + PAD);
    const parentIndex = find(index1D);
    const value = values[parentIndex];
    const sameParentIndices = [];

    for (let index = 0; index < parent.length; index++) {
      const curParentIndex = find(index);
      if (curParentIndex === parentIndex) {
        sameParentIndices.push(index);
      }
    }

    sameParentIndices.forEach((index) => {
      parent[index] = index;
      values[index] = null;
    });

    values[index1D] = value;
  };

  const updateParent = () => {
    for (let index = 0; index < values.length; index++) {
      find(index);
    }
  };

  const print = (r, c) => {
    const index1D = to1DArrayIndex(r, c, ROW + PAD);
    const parentIndex = find(index1D);
    return values[parentIndex];
  };

  const result = [];
  commands.forEach((command) => {
    const [op, arg1, arg2, arg3, arg4] = command.split(" ");
    switch (op) {
      case "UPDATE":
        if (arg3) {
          updateCell(+arg1, +arg2, arg3);
          break;
        }
        updateValue(arg1, arg2);
        break;
      case "MERGE":
        merge(+arg1, +arg2, +arg3, +arg4);
        break;
      case "UNMERGE":
        updateParent();
        unmerge(+arg1, +arg2);
        break;
      case "PRINT":
        result.push(print(+arg1, +arg2) ?? "EMPTY");
        break;
    }
  });
  return result;
}

function to1DArrayIndex(rowIndex, colIndex, R) {
  return rowIndex * R + colIndex;
}
