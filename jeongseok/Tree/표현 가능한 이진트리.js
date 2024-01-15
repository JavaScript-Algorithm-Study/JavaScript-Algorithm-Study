// 포화 이진트리의 노드 갯수는 2^n - 1

// 노드 갯수 구하는 함수
function findNodeCount(bin) {
  for (let i = 0; i < 200; i++) {
    if (2 ** i <= bin.length && bin.length < 2 ** (i + 1)) {
      return i + 1;
    }
  }
}

function checkTree(binaryNumber) {
  if (binaryNumber.length === 1) {
    return 1;
  }

  const midIndex = Math.floor(binaryNumber.length / 2);

  // 중앙이 0이라면
  if (binaryNumber[midIndex] === "0") {
    const left = binaryNumber.slice(0, midIndex);
    const leftMidIndex = Math.floor(left.length / 2);

    const right = binaryNumber.slice(midIndex + 1);
    const rightMidIndex = Math.floor(right.length / 2);

    if (left[leftMidIndex] === "1" || right[rightMidIndex] === "1") {
      return 0;
    }
  }

  if (!checkTree(binaryNumber.slice(0, midIndex))) {
    return 0;
  }

  if (!checkTree(binaryNumber.slice(midIndex + 1))) {
    return 0;
  }

  return 1;
}

function solution(numbers) {
  let answer = [];

  for (let i = 0; i < numbers.length; i++) {
    const n = findNodeCount(numbers[i].toString(2));

    const newBinary = String(numbers[i].toString(2)).padStart(2 ** n - 1, "0");

    answer.push(checkTree(newBinary));
  }

  return answer;
}
