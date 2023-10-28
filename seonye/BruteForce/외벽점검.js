/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/60062
난이도 : Level 3

1. 문제 설명
외벽의 총 둘레는 n미터
ex. n=12, index는 0
취약 지점을 점검하기 위해 보내야하는 친구 수의 최소값

2. 풀이
모든 외벽 취약점을 출발점으로 하기 위해 외벽의 둘레만큼 더해 확장 배열을 사용
cnt: 현재 사용 중인 친구 수
pos: 현재 위치
nextPos: 다음 위치

현재 취약점 위치와 다음 취약점 위치의 거리가 현재 친구로 커버할 수 없는 경우, 다음 친구를 사용하도록 업데이트 

모든 취약 지점을 확인한 후, 모든 친구를 사용하여 커버 가능한 경우, 현재 순열에 대한 친구 수(cnt)를 최소 친구 수(minCnt)와 비교하여 더 작은 값을 minCnt에 저장

weak = [1,  5,  6, 10, 13, 17, 18, 22]

perm = [1,3,2,4]

start = 0
i = 1 출발점 1, 다음 위치는 5, diff는 4이므로 출발점 1의 취약점은 1번친구가 점검
i = 2 현재위치 5, 다음 위치는 6, diff는 1이므로 2번친구가 둘 다 커버 가능
i = 3 현재위치 10, 다음 친구로 업데이트

start = 1

i = 1 출발점 5, 다음 위치 6, diff는 1이므로 처음 친구가 커버
i = 2 다음 위치는 10이되고 출발점은 유지되므로 현재위치를 다음 위치, 다음 친구로 업데이트 해준다.
i = 3 현재 위치는 10, 다음 위치 13, diff는 3이므로 두 번째 친구가 커버

*/

function solution(n, weak, dist) {
  let answer = Infinity;

  const weakSize = weak.length;
  weak = [...weak, ...weak.map((w) => w + n)];

  for (let start = 0; start < weakSize; start++) {
    for (const perm of getPermutations(dist)) {
      let cnt = 1;
      let pos = start;

      for (let i = 1; i < weakSize; i++) {
        const nextPos = start + i;
        const diff = weak[nextPos] - weak[pos];

        if (diff > perm[cnt - 1]) {
          pos = nextPos;
          cnt += 1;

          if (cnt > dist.length) {
            break;
          }
        }
      }

      if (cnt <= dist.length) {
        answer = Math.min(answer, cnt);
      }
    }
  }

  if (answer === Infinity) {
    answer - 1;
  }

  return answer;
}

function getPermutations(arr) {
  const permutations = [];
  const used = new Array(arr.length).fill(false);

  function generatePermutations(current) {
    if (current.length === arr.length) {
      permutations.push(current.slice());
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      if (!used[i]) {
        used[i] = true;
        current.push(arr[i]);
        generatePermutations(current);
        current.pop();
        used[i] = false;
      }
    }
  }

  generatePermutations([]);
  return permutations;
}

const n = 12;
const weak = [1, 5, 6, 10];
const dist = [1, 2, 3, 4];

solution(n, weak, dist);
