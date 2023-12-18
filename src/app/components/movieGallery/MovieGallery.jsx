import './MovieGallery.scss';

import PropTypes from 'prop-types';
import { Row, Col, Empty } from 'antd';

import { MovieCard } from '../index';

function MovieGallery({ movies, genres }) {
  return (
    <Row
      className="movie-gallery movie-gallery--box"
      gutter={[36, 36]}
    >
      {movies.map((movie) => (
        <Col key={movie.id} xs={24} xl={12}>
          <MovieCard
            id={movie.id}
            title={movie.title}
            genres={genres}
            genreIds={movie.genre_ids}
            overview={movie.overview}
            releaseDate={movie.release_date}
            rating={movie.rating}
            voteAverage={movie.vote_average}
            popularity={movie.popularity}
            posterPath={movie.poster_path}
          />
        </Col>
      ))}
      {!movies.length && (
        <Col span={24}>
          <Empty description="No movies found" />
        </Col>
      )}
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
      poster_path: PropTypes.string,
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
