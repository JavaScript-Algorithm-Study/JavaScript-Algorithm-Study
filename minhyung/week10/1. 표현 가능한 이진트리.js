// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/150367
// 시작날짜: 2024.01.10
// 시작시간: 15:13
// 종료시간: 17:23
// 소요시간: 02:10

// 딱 가운데가 루트가됨 `4` (만약 값이 0이면 제대로된 트리가 아님)123 4 567
// 현재 배열 개수가 1개인가? -> 123임 -> `2`가 부모가 됨 -> 왼쪽을 또 봄
// 현재 배열 개수가 1개인가?  -> return함
// 오른쪽도 동일한 로직을 재귀적으로 반복함
// 위쪽에 0인 부모가 존재하는데 자신이 1이면 false 리턴함 -> 트리 만들수없음

// 1, 3, 7, 15, 31, 63, 127 ... 2^n - 1을 padding으로 채워서 포화이진트리를 만들어줌
function makeCompleteBinaryTree(number) {
  let sum = 1;
  let level = 0;
  const digit2 = number.toString(2);
  const digit2Len = digit2.length;

  while (true) {
    if (digit2Len <= sum) {
      return digit2.padStart(sum, "0");
    }
    level += 1;
    sum += 2 ** level;
  }
}
function isCorrectCompleteBinaryTree(arr, isSomewhereParentZero = false) {
  const end = arr.length;
  const mid = Math.floor(end / 2);

  // 현재 노드값 === 1 && 위쪽 노드 어딘가에 0이 있다면
  // 정상적인 트리가 아님 false 리턴
  if (arr[mid] === "1" && isSomewhereParentZero) {
    return false;
  }
  // 제대로 리프노드까지 도달하면 true 리턴
  if (mid === 0) {
    return true;
  }
  // 현재 가운데 노드(부모노드)가 0이라면 isSomewhereParentZero true로 바꿈
  if (arr[mid] === "0") {
    isSomewhereParentZero = true;
  }

  const left = isCorrectCompleteBinaryTree(arr.slice(0, mid), isSomewhereParentZero);
  if (!left) {
    return false;
  }
  const right = isCorrectCompleteBinaryTree(arr.slice(mid + 1, end), isSomewhereParentZero);
  if (!right) {
    return false;
  }

  return true;
}
function solution(numbers) {
  return numbers.map((number) => {
    const completeBinaryTree = makeCompleteBinaryTree(number);
    if (isCorrectCompleteBinaryTree(completeBinaryTree.split(""))) {
      return 1;
    } else {
      return 0;
    }
  });
}
