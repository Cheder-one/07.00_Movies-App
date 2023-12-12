import { useEffect } from 'react';

const useContentOverflow = (ref) => {
  useEffect(() => {
    const elem = ref.current;

    if (elem.scrollHeight > elem.clientHeight) {
      let str = elem.innerText;
      let lastSpace = str.lastIndexOf(' ');

      while (
        elem.scrollHeight > elem.clientHeight &&
        lastSpace !== -1
      ) {
        str = str.slice(0, lastSpace);
        elem.innerText = `${str}...`;
        lastSpace = str.lastIndexOf(' ');
      }

      str = str.trim();
      const lastChar = str.charAt(str.length - 1);
      const resString =
        lastChar === ',' || lastChar === '.'
          ? `${str.slice(0, -1)} ...`
          : `${str} ...`;

      elem.innerText = resString;
    }
  }, []);
};

export default useContentOverflow;
