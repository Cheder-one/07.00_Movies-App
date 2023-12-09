import { Input } from 'antd';
import PropTypes from 'prop-types';

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

Search.propTypes = {
  onInputChange: PropTypes.func.isRequired,
};

export default Search;
