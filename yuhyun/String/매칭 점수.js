function solution(word, pages) {
  const pageScoreMap = new Map(
    pages.map((page, index) => {
      const url = extractUrl(page);
      const externalLinkArray = extractExternalLinkArray(page);
      const wordCnt = countWord(word, page);

      return [url, { index, externalLinkArray, baseScore: wordCnt }];
    })
  );

  const pageMatchScoreArray = Array(pages.length).fill(0);
  pageScoreMap.forEach(({ index, externalLinkArray, baseScore }, url) => {
    pageMatchScoreArray[index] += baseScore;

    externalLinkArray.forEach((externalLink) => {
      if (!pageScoreMap.has(externalLink)) {
        return;
      }

      const { index: externalLinkPageIndex } = pageScoreMap.get(externalLink);
      pageMatchScoreArray[externalLinkPageIndex] +=
        baseScore / externalLinkArray.length;
    });
  });

  const maxMatchScore = Math.max(...pageMatchScoreArray);
  return pageMatchScoreArray.findIndex(
    (matchScore) => matchScore === maxMatchScore
  );
}

function extractUrl(page) {
  return /<meta property="og:url" content="(\S+)"/.exec(page)[1].trim();
}

function extractExternalLinkArray(page) {
  return [...page.matchAll(/<a href="(\S+)">/g)].map(
    (matchResult) => matchResult[1]
  );
}

function countWord(word, page) {
  const lowerWord = word.toLowerCase();
  const alphabetRegex = /[a-z]{1}/i;

  const bodyContent = extractBodyContent(page).toLowerCase();
  const bodyContentOnlyEng = filterLinkTag(bodyContent).replaceAll(
    /[^a-z]/g,
    " "
  );

  return bodyContentOnlyEng
    .split(/\s/)
    .filter((curWord) => curWord === lowerWord).length;
}

function extractBodyContent(page) {
  const BODY_START_TAG = "<body>";
  const BODY_END_TAG = "</body>";

  const bodyStartTagIndex = page.indexOf(BODY_START_TAG);
  const bodyEndTagIndex = page.indexOf(BODY_END_TAG);

  return page.substring(
    bodyStartTagIndex + BODY_START_TAG.length,
    bodyEndTagIndex
  );
}

function filterLinkTag(page) {
  const LINK_START_TAG_REGEX = /<a href=\"\S+">/g;
  const LINK_END_TAG = "</a>";

  return page
    .replaceAll(LINK_START_TAG_REGEX, " ")
    .replaceAll(LINK_END_TAG, " ");
}
