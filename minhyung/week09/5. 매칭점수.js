// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/42893
// 시작날짜: 2024.01.07
// 시작시간: 16:47
// 종료시간:
// 소요시간:

// 한 웹페이지에서 기본점수, 외부링크수, 링크점수, 매칭점수 구할수있음
// 기본점수: 웹페이지 텍스트중 검색어가 등장하는 횟수(대소문자 무시)
// 외부링크수: 웹페이지에서 -> 외부페이지로 연결된 링크개수
// 링크점수: 웹페이지로 링크걸린 다른 웹페이지 기본점수 / 외부링크수 총합
// 매칭점수: 기본점수 + 링크점수

// 한 웹페이지 url: <meta property="og:url" content="https://careers.kakao.com/index" />
// 외부링크: <a href="https://careers.kakao.com/index">
// 모든 url은 https://로만 시작
// 검색어는 대소문자 무시하고 찾음
// 단어 단위로 비교, 완전히 일치하는 경우만 기본점수에 반영

// 0. meta태그에서 주소를 찾음
// 1. word를 검색해 기본점수를 계산함
// 2. a태그로 외부링크들을 찾아둠
// 3. 모든 pages에 대해 1,2가 끝나면 외부링크들을 순환하며 기본점수/외부링크를 더함
// 4. 그렇게 모든 외부링크를 돌았으면 기본점수 + 링크점수를 통해 매칭점수를 구함

// 매칭할 떄 정규표현식을 사용려다 안되는것같아서 그냥 전체를 찾아봄
// 근데 그래도 틀리는거 보면 정규식 문제는 아니었음
// 그럼어디?
// 다른 정규식 확인해봄
// 수량자를 사용할 때 두가지 방법이 존재했음.
// 탐욕적 수량자, 게으른 수량자 두가지 방법이 있었음
// 탐욕적: 모든 범위를 포함하는 가장 큰 범위를 찾음
// 게으른: 가장 작은 범위를 찾음

const getDefaultScore = (page, str) =>
  page.match(new RegExp(`(\b|[^a-zA-Z])${str}(?![a-zA-Z])`, "gi"))?.length ?? 0;
const getMyURL = (page) =>
  page.match(/<meta.*\bproperty="og:url".*\bcontent="(https:.*)".*\/>/i)[1];
const getExternalLinks = (page) =>
  page
    .match(/<a.*\bhref="(https:.*)">/gi)
    ?.map((link) => link.match(/"(.*)"/)[1]) ?? [];

function solution(word, pages) {
  const pagesMap = new Map();

  pages.forEach((page, idx) => {
    const myURL = getMyURL(page);
    const externalLinks = getExternalLinks(page);
    const defaultScore = getDefaultScore(page, word);
    const linkScore = defaultScore;
    const externalLinkNums = externalLinks.length;

    pagesMap.set(myURL, {
      idx,
      defaultScore,
      externalLinks,
      externalLinkNums,
      linkScore,
    });
  });

  pagesMap.forEach(({ defaultScore, externalLinkNums, externalLinks }) => {
    externalLinks.forEach((externalLink) => {
      if (!pagesMap.has(externalLink)) {
        return;
      }

      const externalPage = pagesMap.get(externalLink);
      externalPage.linkScore += defaultScore / externalLinkNums;
    });
  });

  const a = Array.from(pagesMap).sort(
    (a, b) => b[1].linkScore - a[1].linkScore || a[1].idx - b[1].idx
  );
  return a[0][1].idx;
}

const page = `<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta property="og:url" content="https://b.com"/>
</head>
<body>
Suspendisse potenti. Vivamus venenatis tellus non turpis bibendum, 
<a href="https://a.com"> Link to a </a>
blind sed congue urna varius. Suspendisse feugiat nisl ligula, quis malesuada felis hendrerit ut.
<a href="https://c.com"> Link to c </a> <a href="https://c.com"> Link to c </a> <a href="https://c.com"> Link to c </a>
</body>
</html>`;
const func = (page, str) =>
  page
    .replace(/[^a-zA-Z]/gi, " ")
    .split(/\s+/)
    .filter((s) => new RegExp(`^${str}$`, "i").test(s)).length;

console.log(func(page, "blind"));

console.log(getExternalLinks(page));
