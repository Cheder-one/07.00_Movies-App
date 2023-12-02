import { Row, Col } from 'antd';

import MovieCard from './MovieCard';

function MovieGallery({ movies, genres }) {
  return (
    <Row gutter={[36, 36]}>
      {movies.map((movie) => (
        <Col xs={24} xl={12} key={movie.id}>
          <MovieCard
            id={movie.id}
            title={movie.title}
            genres={genres}
            genreIds={movie.genre_ids}
            overview={movie.overview}
            releaseDate={movie.release_date}
            voteAverage={movie.vote_average}
            posterPath={movie.poster_path}
          />
        </Col>
      ))}
    </Row>
  );
}

export default MovieGallery;
