function solution(phone_book) {
  phone_book.sort((a, b) => a - b);

  const pMap = new Set();

  for (let i = 0; i < phone_book.length; i++) {
    for (let j = 0; j < phone_book[i].length; j++) {
      if (pMap.has(phone_book[i].slice(0, j + 1))) {
        return false;
      }
    }
    pMap.add(phone_book[i]);
  }

  return true;
}
