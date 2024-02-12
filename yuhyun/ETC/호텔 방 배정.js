function solution(k, rooms) {
  const parents = new Map();
  const find = (index) => {
    if (!parents.has(index)) {
      parents.set(index, index);
    }
    if (parents.get(index) === index) {
      return index;
    }
    parents.set(index, find(parents.get(index)));
    return parents.get(index);
  };
  const union = (indexA, indexB) => {
    const parentA = find(indexA);
    const parentB = find(indexB);
    parents.set(parentA, parentB);
  };

  return rooms.map((room) => {
    const assigned = find(room);
    union(room, assigned + 1);
    union(assigned, assigned + 1);
    return assigned;
  });
}
