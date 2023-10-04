function solution(s) {
  let min = s.length;

  for (let unit = 1; unit <= s.length / 2; unit++) {
    let compressed = 0;
    let cnt = 1;
    let prevWord = s.substring(0, unit);

    for (let start = unit; start < s.length; start += unit) {
      if (min <= compressed) {
        break;
      }

      const curWord = s.substring(start, start + unit);
      if (prevWord === curWord) {
        cnt += 1;
        continue;
      }

      compressed += unit + (cnt === 1 ? 0 : String(cnt).length);
      cnt = 1;
      prevWord = curWord;
    }

    compressed += prevWord.length + (cnt === 1 ? 0 : String(cnt).length);
    min = Math.min(min, compressed);
  }

  return min;
}
