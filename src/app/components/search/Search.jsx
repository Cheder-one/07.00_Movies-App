import { Input } from 'antd';

import './Search.scss';

function Search({ onInputChange }) {
  const handleInputChange = (event) => {
    onInputChange(event.target.value);
  };

  return (
    <Input
      className="movie-search movie-search--box"
      placeholder="Type to search..."
      autoFocus
      onChange={handleInputChange}
    />
  );
}

export default Search;
