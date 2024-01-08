/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/42893
난이도 : Level 3

1,2,9-14 60점
*/
function solution(word, pages) {
  var answer = 0;

  const pageDic = {};
  const pageUrlRegex = new RegExp('<meta property="og:url" content="([^"]+)+"/>');
  const bodyRegex = new RegExp('<body>([\\s\\S]*?)</body>');
  const wordRegex = new RegExp(`[^a-z]${word}[^a-z]`, 'gi');
  const aTagRegex = new RegExp('<a href="https://[\\S]+">', 'g');
  const httpsRegex = new RegExp('^https://[\\S]+');

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const pageUrl = pageUrlRegex.exec(page)[1];
    if (!httpsRegex.test(pageUrl)) continue;
    const bodyContent = bodyRegex.exec(page)[1];
    const basicScore = bodyContent.match(wordRegex) ? bodyContent.match(wordRegex).length : 0;
    const links = bodyContent.match(aTagRegex).map((aTag) => aTag.replace('<a href="', '').replace('">', ''));

    pageDic[pageUrl] = {
      index: i,
      basicScore,
      links,
      linkScore: basicScore / links.length,
    };
  }

  console.log(pageDic);

  const pageScore = [];

  Object.entries(pageDic).forEach(([key, value]) => {
    const { index, basicScore, links, linkScore } = value;

    if (pageScore[index]) pageScore[index] += basicScore;
    else pageScore[index] = basicScore;

    for (let l of links) {
      if (!pageDic[l]) continue;

      const { index } = pageDic[l];

      if (pageScore[index]) pageScore[index] += linkScore;
      else pageScore[index] = linkScore;
    }
  });

  let maxScore = -1;

  for (let i = 0; i < pageScore.length; i++) {
    if (pageScore[i] > maxScore) {
      maxScore = pageScore[i];
      answer = i;
    }
  }

  return answer;
}
