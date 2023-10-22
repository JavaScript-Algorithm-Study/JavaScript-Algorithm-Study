// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/92342?language=javascript
// 시작날짜: 2023.10.21
// 시작시간: 13:00
// 종료시간: 15:08
// 소요시간: 02:08
// for문으로 풀려 했는데 반례 존재함.
// 그래서 dfs로 시도 13:33
// dfs 했는데 반례 존재 15:04 -> 경우의 수 여러개 일 때 낮은거 더 많이 맞춘걸 구해야함
// 23번 반례: 3, [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0] 했을 경우 동점이 최대 점수이므로 [-1]이 나와야함.
// now가 11 됐을 때 해당 처리를 해줌으로 인해 클리어

// 어피치가 n발 쏜 후 -> 라이언이 n발 쏨
// 같은 k점에 대해 어피치가 a, 라이언이 b발 맞히면 더 더 많이 맞힌 선수가 가져감
//    단, a = b 일 경우 어피치가 가져감
//    많이 맞혀도 k점만 가져감
// 모든 과녁 점수에 대해 각 선수의 최정 점수를 계산함
// 점수가 같을경우 어피치가 우승자

// 현 상황은 어피치가 b발을 쐈고, 라이언이 화살을 쏠 차례
// 어피치를 큰 점수차로 이기기 위해 b발을 어떤 과녁에 맞혀야 할지 구하려 함
// 10점 ~ 0점에 대해 배열을 리턴하도록 함
// 만약 라이언이 어떤 경우에도 무조건 지거나 비겨면 [-1] 을 리턴함

// n = 화살개수, info = [10,9,8,...,0]

// n = 화살개수, info = [10,9,8,...,0]
function solution(n, info) {
  const lastIdx = info.length;
  let maxScoreDiff = -1;
  let result = [];

  const dfs = (now, leftArrow, hitsLion) => {
    if (now >= 11) {
      const [apeach, lion] = calcScore(info, hitsLion);
      const scoreDiff = lion - apeach;
      if (maxScoreDiff < scoreDiff && scoreDiff !== 0) {
        maxScoreDiff = scoreDiff;
        result = [...hitsLion];
        result[10] = leftArrow;
      } else if (maxScoreDiff === scoreDiff) {
        result = getMoreSmaller(result, hitsLion);
      }

      return;
    }

    for (let i = now; i < 11; i++) {
      dfs(i + 1, leftArrow, [...hitsLion]);

      const hitsArrow = info[i];
      if (hitsArrow + 1 <= leftArrow) {
        const next = [...hitsLion];
        next[i] = hitsArrow + 1;
        dfs(i + 1, leftArrow - (hitsArrow + 1), next);
      }
    }
  };

  dfs(0, n, Array(11).fill(0));

  return result.length ? result : [-1];
}

function calcScore(apeach, lion) {
  let [apeachScore, lionScore] = [0, 0];

  for (let i = 0; i < 11; i++) {
    if (apeach[i] === 0 && lion[i] === 0) {
      continue;
    }

    const nowScore = 10 - i;
    if (apeach[i] >= lion[i]) {
      apeachScore += nowScore;
    } else {
      lionScore += nowScore;
    }
  }

  return [apeachScore, lionScore];
}
function getMoreSmaller(now, before) {
  for (let i = 10; i >= 0; i--) {
    if (now[i] > before[i]) return now;
    if (now[i] < before[i]) return before;
  }
  return now;
}
