import { Row, Col } from 'antd';
import PropTypes from 'prop-types';

import { cropOverview } from '../../utils';

import './MovieGallery.scss';
import MovieCard from './MovieCard';

function MovieGallery({ movies, genres }) {
  return (
    <Row className="movie-gallery" gutter={[36 + 20, 36]}>
      {movies.map((movie) => (
        <Col key={movie.id} xs={24} xl={12}>
          <MovieCard
            id={movie.id}
            title={movie.title}
            genres={genres}
            genreIds={movie.genre_ids}
            overview={cropOverview(movie.overview)}
            releaseDate={movie.release_date}
            voteAverage={movie.vote_average}
            posterPath={movie.poster_path}
          />
        </Col>
      ))}
    </Row>
  );
}

MovieGallery.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      genre_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
      overview: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired,
      vote_average: PropTypes.number.isRequired,
      poster_path: PropTypes.string.isRequired,
    })
  ).isRequired,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MovieGallery;
