import { useEffect } from 'react';

const useContentOverflow = (ref) => {
  useEffect(() => {
    const elem = ref.current;

    if (elem.scrollHeight > elem.clientHeight) {
      let truncContent = elem.innerText;
      let lastSpaceIndex = truncContent.lastIndexOf(' ');

      while (
        elem.scrollHeight > elem.clientHeight &&
        lastSpaceIndex !== -1
      ) {
        truncContent = truncContent.slice(0, lastSpaceIndex);
        elem.innerText = `${truncContent}...`;
        lastSpaceIndex = truncContent.lastIndexOf(' ');
      }
    }
  }, []);
};

export default useContentOverflow;
