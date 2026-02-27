import { useState, useEffect, useCallback } from 'react';

const useIntersection = (threshold = 0.15, rootMargin = '0px') => {
  const [element, setElement] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // 콜백 ref: DOM에 연결/해제될 때마다 element state를 업데이트
  const ref = useCallback((node) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [element, threshold, rootMargin]);

  return [ref, isVisible];
};

export default useIntersection;
