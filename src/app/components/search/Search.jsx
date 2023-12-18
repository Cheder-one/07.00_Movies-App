import './Search.scss';

import PropTypes from 'prop-types';
import { Input } from 'antd';

function Search({ value, onInputChange }) {
  const handleInputChange = (event) => {
    onInputChange(event.target.value);
  };

  return (
    <Input
      className="movie-search movie-search--box"
      placeholder="Type to search..."
      value={value}
      autoFocus
      onChange={handleInputChange}
    />
  );
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default Search;
