import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-cycle
import { MovieGallery, Pagination, Search } from '../components';

function MoviesPage({
  movies,
  genres,
  currPage,
  onInputChange,
  onPageChange,
}) {
  return (
    <>
      <Search onInputChange={onInputChange} />
      <MovieGallery movies={movies.results} genres={genres} />
      <Pagination
        currPage={currPage}
        totalItems={movies.total_results}
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
  onInputChange: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default MoviesPage;
