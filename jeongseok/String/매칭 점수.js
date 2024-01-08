// 기본 점수 : 검색 단어 수
// 외부 링크 수 : 외부로 링크 걸린 수
// 링크 점수 : 링크 걸린 다른 페이지의 기본 점수 / 외부 링크 수의 총합
// 매칭 점수 : 기본 점수 + 링크 점수

function solution(word, pages) {
  word = word.toLowerCase();

  // 총 점수
  let scoreArr = [];

  // 이름 배열
  let nameArr = [];

  // 기본 점수 배열
  let originScoreArr = [];

  // 외부 링크 수 배열
  let linkCountArr = [];

  // 기본 점수 및 외부 링크 수 구하기
  for (let i = 0; i < pages.length; i++) {
    let url = pages[i].match(/<meta property="og:url" content=(\S+)\/>/)[0];
    url = url.slice(33, url.length - 3);

    nameArr.push(url);

    let score = 0;

    pages[i].split(/[^a-zA-Z]/).map((ele) => {
      if (ele.toLowerCase() === word) {
        score += 1;
      }
    });

    originScoreArr.push(score);
    scoreArr.push({ index: i, score });

    // 외부 링크 수 구하기
    let urlList = pages[i].match(/<a href=(\S+)">/g);

    linkCountArr.push(urlList ? urlList.length : 0);
  }

  for (let i = 0; i < pages.length; i++) {
    // 외부 링크 구하기
    let urlList = pages[i].match(/<a href=(\S+)">/g);

    let linkScore = 0;

    urlList &&
      urlList.map((url) => {
        const curUrl = url.slice(9, url.length - 2);
        const outLinkIndex = nameArr.findIndex((ele) => ele === curUrl);
        if (outLinkIndex >= 0) {
          scoreArr[outLinkIndex].score += originScoreArr[i] / linkCountArr[i];
        }
      });
  }

  scoreArr.sort((a, b) => {
    if (a.score === b.score) {
      return a.index - b.index;
    } else {
      return b.score - a.score;
    }
  });

  return scoreArr[0].index;
}
