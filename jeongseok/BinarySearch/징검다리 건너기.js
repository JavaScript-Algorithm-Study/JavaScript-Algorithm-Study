// 디딤돌을 밟을 때마다 1씩 줄어든다.
// 0이 되면 밟지 못하고 다음 디딤돌로 여러 칸 점프 가능
// 밟을 수 있는 디딤돌 여러개면 무조건 가장 가까운 디딤돌

// k : 최대 건너뛸 수 있는 디딤돌

function solution(stones, k) {
  const sLen = stones.length;

  let start = 1;
  let end = 200000000;

  while (start <= end) {
    let mid = Math.ceil((start + end) / 2);

    let impossibleCount = 0;

    let canJump = true;

    for (let i = 0; i < sLen; i++) {
      if (stones[i] - mid > 0) {
        impossibleCount = 0;
      } else {
        impossibleCount++;
      }

      if (impossibleCount === k) {
        canJump = false;
        break;
      }
    }

    if (!canJump) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return start;
}
