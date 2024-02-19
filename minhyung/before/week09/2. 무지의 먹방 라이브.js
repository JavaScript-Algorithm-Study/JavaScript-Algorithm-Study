// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/42587
// 시작날짜: 2024.01.05
// 소요시간: 06:20

// k가 2 x 10^13승 이하이기 때문에 우선순위 큐 써도 전체탐색 절대안됨
// food_times도 20만이라 20만*20만 = 400억이라 안됨

// food_times에서 제일 작은 값 찾아서 그거만큼 뺴주면? -> 최소힙 사용하면될것같은데
// 빼는 반복 횟수는? 현재 최소힙 길이만큼 빼줌
// 그거 뺄 때마다 시간을 계산함. 만약 빼다가 k가 `음수`가 된다면?
// 1 ~ 현재 제일 작은수로 이진탐색 진행함. -> 이진탐색 결과는 배열만큼 돌았을 때 0이되는값

// 위 구현 우선순위큐로 food_times를 넣어둠
//  1. 제일 작은값을 food_times 앞부터 뺌
//  2-1. 빼는 도중에 k 달성할시
//    -> 다음 idx가 정답
//  2-2. 끝까지 뺐는데 k 미만일경우
//    -> 우선순위 큐에서 다음 값을 빼서 1부터 반복
//  2-3. 빼던 도중 뺀값이 k를 초과할 경우
//    -> 이전 작은값, 현재값 이진탐색 수행
// 이방법 시간복잡도 -> 200억
// 1 2 3 ... 199,999 200,000 로 되어있는게 아마 최악의 배열순서
// -> 등차수열 200,000+199,999+199,998+…+3+2+1 -> 200억

// 우선 이진탐색으로 result 1 ~ 1억 사이 값을 찾음 log 1억 = 8
// 1. food_times(20만)을 앞부터 더했을 때 k 초과하는 값 -> 20만 * 8 = 160만
// 2. k 이하가 되는 값

// k = 20조

// food_times 정렬함 -> 350만
// 최댓값으로 앞부터 더함 -> 다 더한게 k 미만이면 -1 반환
// -> k초과면 food food_times 중간값으로 다시 더함
// 찾아야 하는것: 다 더했을 때 k 초과하지 않는 값. -> log 20만 * 20만 = 17 * 20만 = 340만
// 해당 값만큼 배열에서 모두 뺌 -> 20만
// 1씩 맨 앞부터 빼면서 k가 되는곳을 찾음. -> 길이: 10, 1,9,9,9,9,9,9,9,9 k=1
// 1개는 1, 나머지 싹다 1억, k=10조 일 때
// 결국 찾은값은 1이됨 -> 계속 돌리면 시간초과

// 1. 최소힙에서 맨 위 값을 pop하고 now 에 저장함
// 2. 최소힙에서 pop함, now만큼 빼봄, 0을 초과하면 다시 최소힙에 넣음
// 3. 지금 뺀 값이 k를
// -> 결국 시간초과 날듯..

class PQ {
  constructor(cmp) {
    //cmp: (parent, children) => boolean
    this.cmp = cmp;
    this.arr = [];
  }
  push(data) {
    // 맨 뒤에 넣고서 위로 올라오면서 cmp가 true면 swap
    // 아니면 break;
    this.arr.push(data);
    let now = this.arr.length - 1;

    while (now > 0) {
      const parent = Math.floor((now - 1) / 2);
      if (this.cmp(this.arr[now], this.arr[parent]) < 0) {
        this.swap(parent, now);
        now = parent;
      } else {
        break;
      }
    }
  }
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.swap(0, this.arr.length - 1);
    const result = this.arr.pop();

    let now = 0;
    let left = 1;
    let right = 2;

    while (this.arr[left] !== undefined) {
      let next = left;
      if (
        this.arr[right] !== undefined &&
        this.cmp(this.arr[right], this.arr[left]) < 0
      ) {
        next = right;
        this.swap(left, right);
      }
      if (this.cmp(this.arr[next], this.arr[now]) < 0) {
        this.swap(now, next);
        now = next;
        left = now * 2 + 1;
        right = now * 2 + 2;
      } else {
        break;
      }
    }

    return result;
  }
  swap(a, b) {
    [this.arr[a], this.arr[b]] = [this.arr[b], this.arr[a]];
  }
  get front() {
    return this.arr[0];
  }
  isEmpty() {
    return this.arr.length === 0;
  }
}

// k=13
// 4  6  1  3  |
// ---------------
// 1  2  3  4   1
// 5  6     7   2
// 8  9     10  3
// 11 12        4
//    13        5
//    14        6

// 1 3 4 6
// 4 6 2 2 = 14

// k = 9
// 2   3   1   5   1   2
//
// 1   2   3   4   5   6
// 7   8       9       10
//     11      12
//             13
//             14

// 굳이 우선순위 큐로 할 필요가...?
// 우선순위 큐 구현이 잘못되어 있어서 틀린듯...
// 다시 확인필요
// left right에서 swap 메서드를 사용했음.... ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ 아...
// 근데 배열로 구현해도 상관없어보임
// 상관 없었음
function solution(food_times, k) {
  const arr = food_times.map((time, idx) => ({ time, idx: idx + 1 }));
  let sum = 0;
  let beforeTime = 0;
  let leftFoodNum = food_times.length;

  arr.sort((a, b) => b.time - a.time);

  for (let i = leftFoodNum - 1; i >= 0; i--) {
    // 음식 합(이전 - now) * 남은 음식 개수
    const { time: nowTime } = arr.at(-1);

    const nowSum = (nowTime - beforeTime) * leftFoodNum;

    // 만약 sum + nowSum  > k -> 이후에 먹을 음식에 답이 존재함
    if (sum + nowSum > k) {
      const sorted = arr.sort((a, b) => a.idx - b.idx);
      return sorted[(k - sum) % leftFoodNum].idx;
    } else {
      sum += nowSum;
      beforeTime = nowTime;
      leftFoodNum -= 1;
      arr.pop();
    }
  }
  return -1;
}
