import { Input } from 'antd';

import './Search.scss';

function Search() {
  return (
    <Input
      className="movie-search movie-search--box"
      placeholder="Type to search..."
    />
  );
}

export default Search;
