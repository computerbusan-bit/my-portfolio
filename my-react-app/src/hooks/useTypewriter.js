import { useState, useEffect } from 'react';

/**
 * 타이핑 → 삭제 → 다음 단어 순환 훅
 *
 * @param {string[]} words
 * @param {object}   [opts]
 * @param {number}   [opts.typeSpeed=90]          ms/글자 (타이핑)
 * @param {number}   [opts.deleteSpeed=55]         ms/글자 (삭제)
 * @param {number}   [opts.pauseAfterWord=1600]    완성 후 대기 ms
 * @param {number}   [opts.pauseBeforeNext=380]    삭제 후 대기 ms
 *
 * @returns {{ displayText, wordIdx, isDeleting, isPaused, pause, resume }}
 */
export function useTypewriter(
  words,
  {
    typeSpeed       = 90,
    deleteSpeed     = 55,
    pauseAfterWord  = 1600,
    pauseBeforeNext = 380,
  } = {},
) {
  const [wordIdx,     setWordIdx]     = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting,  setIsDeleting]  = useState(false);
  const [isPaused,    setIsPaused]    = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const word = words[wordIdx];
    let id;

    if (!isDeleting && displayText === word) {
      // 단어 완성 → 대기 후 삭제 시작
      id = setTimeout(() => setIsDeleting(true), pauseAfterWord);
    } else if (isDeleting && displayText === '') {
      // 삭제 완료 → 대기 후 다음 단어로
      setIsDeleting(false);
      id = setTimeout(
        () => setWordIdx(i => (i + 1) % words.length),
        pauseBeforeNext,
      );
    } else if (!isDeleting) {
      // 타이핑: 한 글자 추가
      id = setTimeout(
        () => setDisplayText(word.slice(0, displayText.length + 1)),
        typeSpeed,
      );
    } else {
      // 삭제: 한 글자 제거
      id = setTimeout(
        () => setDisplayText(prev => prev.slice(0, -1)),
        deleteSpeed,
      );
    }

    return () => clearTimeout(id);
  }, [
    words, wordIdx, displayText, isDeleting, isPaused,
    typeSpeed, deleteSpeed, pauseAfterWord, pauseBeforeNext,
  ]);

  const pause  = () => setIsPaused(true);
  const resume = () => setIsPaused(false);

  return { displayText, wordIdx, isDeleting, isPaused, pause, resume };
}
