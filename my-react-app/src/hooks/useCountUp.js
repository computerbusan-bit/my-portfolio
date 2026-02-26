import { useState, useEffect, useRef } from 'react';

/**
 * requestAnimationFrame 기반 숫자 카운팅 훅
 * @param {number} target  - 목표 숫자
 * @param {number} duration - 애니메이션 지속 시간 (ms)
 * @param {boolean} isActive - true가 되는 순간 카운팅 시작
 */
const useCountUp = (target, duration = 1200, isActive = false) => {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutCubic — 처음엔 빠르게, 끝에서 자연스럽게 감속
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, isActive]);

  return count;
};

export default useCountUp;
