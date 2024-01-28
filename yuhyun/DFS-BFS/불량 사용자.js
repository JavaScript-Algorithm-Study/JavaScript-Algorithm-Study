function solution(user_id, banned_id) {
  const bannedLength = banned_id.length;
  const cases = new Set();

  const dfs = (bannedBit, bannedIndex) => {
    if (bannedIndex === bannedLength) {
      cases.add(bannedBit);
      return;
    }

    const maskedId = banned_id[bannedIndex];
    user_id.forEach((id, index) => {
      if (bannedBit & (1 << index) || !isBanned(id, maskedId)) return;
      dfs(bannedBit | (1 << index), bannedIndex + 1);
    });
  };

  dfs(0, 0);
  return cases.size;
}

function isBanned(id, maskedId) {
  const MASK = "*";
  if (id.length !== maskedId.length) return false;
  return [...maskedId].every((char, index) =>
    char === MASK ? true : char === id[index]
  );
}
