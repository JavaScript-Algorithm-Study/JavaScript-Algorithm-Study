// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/64064
// 풀이날짜: 2024.01.28

const getRegExp = (pattern) => new RegExp(`^${pattern.replaceAll("*", ".")}$`);

function solution(user_id, banned_id) {
  const matchedArrs = banned_id.map((pattern) =>
    user_id.reduce((arr, userId) => {
      if (getRegExp(pattern).test(userId)) {
        arr.push(userId);
      }
      return arr;
    }, [])
  );

  const result = new Set();

  const dfs = (arrs, depth, set) => {
    if (depth >= arrs.length) {
      result.add(Array.from(set).sort().toString());
      return;
    }

    arrs[depth].forEach((userId) => {
      if (set.has(userId)) return;
      set.add(userId);
      dfs(arrs, depth + 1, set);
      set.delete(userId);
    });
  };

  dfs(matchedArrs, 0, new Set());

  return result.size;
}
