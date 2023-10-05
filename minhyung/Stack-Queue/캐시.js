// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/17680
// 시작날짜: 2023.10.05
// 시작시간: 21:40
// 종료시간: 10:07
// 소요시간: 00:27

// 캐시를 적용할 때 캐시 크기에 따른 실행시간 측정 프로그램
// 캐시사이즈: 30이하
// 도시들: 100,000개 이하
// 도시이름: 대소문자 구분 x
// 캐시교체 LRU 사용
// cache hit: 실행시간 1
// cache miss: 실행시간 5

function solution(cacheSize, cities) {
  const cache = [];
  let runTime = 0;

  cities.forEach((city) => {
    city = city.toLowerCase();
    // 현재 시티의 캐시가 있다면, runTime +1
    // 현재 시티를 가장 앞으로 옮김
    const nowIdx = cache.findIndex((c) => c === city);
    if (nowIdx > -1) {
      const nowCity = cache[nowIdx];
      cache.splice(nowIdx, 1);
      cache.push(nowCity);
      runTime += 1;
    }
    // 현재 시티의 캐시가 없다면
    else {
      if (cacheSize > 0) {
        // cache가 꽉 차있다면 가장 많이 접근 안한거 제거함(0번째꺼)
        if (cache.length === cacheSize) {
          cache.shift();
        }
        cache.push(city);
      }
      runTime += 5;
    }
  });
  return runTime;
}

console.log(solution(2, ["Jeju", "Pangyo", "NewYork", "newyork"]));
