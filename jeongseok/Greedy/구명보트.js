function solution(people, limit) {
  let answer = 0;

  people.sort((a, b) => b - a);

  let start = 0;
  let end = people.length - 1;
  while (start <= end) {
    let first = people[start];
    let second = people[end];

    if (start === end) {
      answer++;
      break;
    }

    if (first + second <= limit) {
      end--;
    }
    start++;
    answer += 1;
  }

  return answer;
}
