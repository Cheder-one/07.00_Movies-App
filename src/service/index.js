import movieRequest from './movieRequest';
import {
  createGuestSession,
  fetchMovieGenres,
  fetchMoviesByPopular,
  fetchMoviesByQuery,
  getSessionRatedMovies,
  sendMovieRating,
} from './requestMethods';

export {
  sendMovieRating,
  getSessionRatedMovies,
  createGuestSession,
  movieRequest,
  fetchMovieGenres,
  fetchMoviesByPopular,
  fetchMoviesByQuery,
};
