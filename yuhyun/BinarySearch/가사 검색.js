function solution(words, queries) {
  const WILDCARD = "?";

  const reversedWords = words.map(reverse);
  reversedWords.sort();
  words.sort();

  const cache = new Map();
  return queries.map((query) => {
    if (cache.has(query)) return cache.get(query);

    const [curWords, curQuery] = query.endsWith(WILDCARD)
      ? [words, query]
      : [reversedWords, reverse(query)];
    const start = lowerBound(curQuery, curWords, compare);
    const end = upperBound(curQuery, curWords, compare);
    const result = curWords
      .slice(start, end)
      .filter((word) => word.length === curQuery.length).length;

    cache.set(query, result);
    return result;
  });
}

function reverse(word) {
  return [...word].reverse().join("");
}

function compare(word, query) {
  const WILDCARD = "?";

  const shortLength = word.length < query.length ? word.length : query.length;
  for (let index = 0; index < shortLength; index += 1) {
    const wordChar = word[index];
    const queryChar = query[index];

    if (queryChar === WILDCARD || queryChar === wordChar) continue;
    return wordChar.charCodeAt(0) - queryChar.charCodeAt(0);
  }
  return 0;
}

function lowerBound(query, words, compare) {
  let left = -1;
  let right = words.length;
  while (left + 1 < right) {
    const mid = Math.floor((left + right) / 2);
    if (compare(words[mid], query) < 0) {
      left = mid;
      continue;
    }
    right = mid;
  }
  return right;
}

function upperBound(query, words) {
  let left = -1;
  let right = words.length;
  while (left + 1 < right) {
    const mid = Math.floor((left + right) / 2);
    if (compare(words[mid], query) > 0) {
      right = mid;
      continue;
    }
    left = mid;
  }
  return right;
}
