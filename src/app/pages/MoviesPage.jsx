import PropTypes from 'prop-types';
import { useContext } from 'react';

import { MovieGallery, Pagination, Search } from '../components';
import { SearchContext } from '../../App';

function MoviesPage({
  movies,
  genres,
  currPage,
  // searchValue,
  onInputChange,
  onPageChange,
}) {
  const searchValue = useContext(SearchContext);

  return (
    <>
      <Search onInputChange={onInputChange} value={searchValue} />
      <MovieGallery movies={movies.results} genres={genres} />
      <Pagination
        currPage={currPage}
        totalItems={movies.total_results - 2000}
        onPageChange={onPageChange}
      />
    </>
  );
}

MoviesPage.propTypes = {
  movies: PropTypes.object.isRequired,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  currPage: PropTypes.number.isRequired,
  // searchValue: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default MoviesPage;
