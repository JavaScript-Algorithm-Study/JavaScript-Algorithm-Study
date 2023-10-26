function solution(people, limit) {
  let left = 0;
  let right = people.length - 1;
  let nBoat = 0;

  people.sort((a, b) => a - b);
  while (left < right) {
    const min = people[left];
    const max = people[right];

    nBoat += 1;
    right -= 1;

    if (max + min <= limit) {
      left += 1;
      continue;
    }
  }

  return left === right ? nBoat + 1 : nBoat;
}
