import { useEffect, useRef } from 'react';

const useDebounce = (fn, delay) => {
  const timerRef = useRef(null);

  useEffect(() => {
    // Clear the timer when the component unmounts
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return function debouncedFn(...args) {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

export default useDebounce;
