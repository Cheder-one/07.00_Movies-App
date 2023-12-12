const cropOverview = (text) => {
  let str = '';
  const arr = text.split(' ');

  while (str.length < 210) {
    if (!arr.length) return str;
    str += `${arr.shift()} `;
  }

  str = str.trim();
  const lastChar = str.charAt(str.length - 1);
  return lastChar === ',' || lastChar === '.'
    ? `${str.slice(0, -1)}...`
    : `${str}...`;
};

export default cropOverview;
