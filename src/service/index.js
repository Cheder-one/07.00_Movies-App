import movieRequest from './movieRequest';
import {
  createGuestSession,
  deleteMovieRating,
  fetchMovieGenres,
  fetchMoviesByPopular,
  fetchMoviesByQuery,
  getSessionRatedMovies,
  sendMovieRating,
} from './requestMethods';

export {
  deleteMovieRating,
  sendMovieRating,
  getSessionRatedMovies,
  createGuestSession,
  movieRequest,
  fetchMovieGenres,
  fetchMoviesByPopular,
  fetchMoviesByQuery,
};
