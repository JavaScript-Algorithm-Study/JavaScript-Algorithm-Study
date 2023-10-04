function solution(msg) {
  const result = [];
  const dict = new Map(
    [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].map((char, i) => [char, i + 1])
  );

  let start = 0;
  let end = 1;
  while (start < msg.length) {
    const word = msg.substring(start, end);
    if (!dict.has(word)) {
      const matched = msg.substring(start, end - 1);
      result.push(dict.get(matched));
      dict.set(word, dict.size + 1);

      start = end - 1;
      end = start + 1;
      continue;
    }

    if (end === msg.length) {
      result.push(dict.get(word));
      break;
    }

    end += 1;
  }
  return result;
}
