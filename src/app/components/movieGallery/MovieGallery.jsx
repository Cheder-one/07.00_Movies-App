import PropTypes from 'prop-types';
import { Row, Col, Empty } from 'antd';

import './MovieGallery.scss';
import MovieCard from '../movieCard/MovieCard';

function MovieGallery({ movies, genres }) {
  const API_KEY = '3bda6d944feadb981c676c7e24256c78';
  const GUEST_SESSION_ID = 'e9c7010adc83ca691529bdced74da492';
  const REQUEST_TOKEN = 'a59d958b33b43c17c864325977f005ba0e550b2c';

  const MOVIE_ID = 550;
  const RATING = 10;

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      // Authorization:
      //   'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYmRhNmQ5NDRmZWFkYjk4MWM2NzZjN2UyNDI1NmM3OCIsInN1YiI6IjY1NmFjM2JmZDQ2NTM3MDBjNWU3NDQ5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w0U2Lwvbt2zIO8WLXaXOkvVcwg0kJQ6SSW7OGIwvyyQ',
    },
    body: JSON.stringify({ value: RATING }),
  };

  // fetch(
  //   `https://api.themoviedb.org/3/movie/${MOVIE_ID}/rating?api_key=${API_KEY}&guest_session_id=${GUEST_SESSION_ID}`,
  //   options
  // )
  //   .then((response) => response.json())
  //   .then((response) => console.log(response))
  //   .catch((err) => console.error(err));

  //--------------------------

  options.method = 'GET';
  delete options.body;

  fetch(
    `https://api.themoviedb.org/3/guest_session/${GUEST_SESSION_ID}/rated/movies?api_key=${API_KEY}`
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));

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
