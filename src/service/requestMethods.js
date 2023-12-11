// eslint-disable-next-line
import qs from 'qs';
import { API_KEY } from '../app/utils';

import movieRequest from './movieRequest';

const apiKey = qs.stringify({ api_key: API_KEY });
const getGuestId = () => sessionStorage.getItem('guestSessionId');

export const createGuestSession = async () => {
  if (!sessionStorage.getItem('guestSessionId'))
    try {
      const response = await movieRequest(
        'GET',
        `/authentication/guest_session/new?${apiKey}`
      );

      const data = response.guest_session_id;
      sessionStorage.setItem('guestSessionId', data);
    } catch (error) {
      throw new Error(
        `Ошибка при создании гостевой сессии: ${error}`
      );
    }

  return sessionStorage.getItem('guestSessionId');
};

export const sendMovieRating = async (movieId, rating) => {
  const guestId = qs.stringify({ guest_session_id: getGuestId() });

  try {
    const response = await movieRequest(
      'POST',
      `/movie/${movieId}/rating?${apiKey}&${guestId}`,
      { value: rating }
    );
    return response;
  } catch (error) {
    throw new Error(
      `Ошибка при отправке оценки фильма на сервер: ${error}`
    );
  }
};
// sendMovieRating(346, 10).then((data) => {
//   console.log(data);
// });

export const deleteMovieRating = async (movieId) => {
  const guestId = qs.stringify({ guest_session_id: getGuestId() });

  try {
    const response = await movieRequest(
      'DELETE',
      `/movie/${movieId}/rating?${apiKey}&${guestId}`
    );
    return response;
  } catch (error) {
    throw new Error(
      `Ошибка при удалении оценки фильма с сервера: ${error}`
    );
  }
};

export const getSessionRatedMovies = async (page) => {
  const params = qs.stringify({
    page,
    language: 'ru-RU',
    sort_by: 'vote_average.desc',
  });

  try {
    const response = await movieRequest(
      'GET',
      `/guest_session/${getGuestId()}/rated/movies?api_key=${API_KEY}&${params}`
    );
    return response;
  } catch (error) {
    throw new Error(
      `Ошибка при получении списка оцененных фильмов: ${error}`
    );
  }
};

// getSessionRatedMovies().then((data) => {
//   console.log(data);
// });

export const fetchMoviesByPopular = async (page) => {
  const params = qs.stringify({
    page,
    language: 'ru-RU',
    include_adult: false,
    include_video: false,
    sort_by: 'vote_average.desc',
    without_genres: '99,10755',
    'vote_count.gte': 200,
  });

  try {
    const response = await movieRequest(
      'GET',
      `/discover/movie?${apiKey}&${params}`
    );
    return response;
  } catch (error) {
    throw new Error(
      `Ошибка при получении списка популярных фильмов: ${error}`
    );
  }
};

export const fetchMovieGenres = async () => {
  try {
    const response = await movieRequest(
      'GET',
      `/genre/movie/list?${apiKey}`
    );
    return response.genres;
  } catch (error) {
    throw new Error(`Ошибка при получении списка жанров: ${error}`);
  }
};

export const fetchMoviesByQuery = async (query, page) => {
  const params = qs.stringify({
    query,
    page,
    language: 'ru-RU',
    include_adult: false,
  });

  try {
    const response = await movieRequest(
      'GET',
      `/search/movie?${apiKey}&${params}`
    );
    return response;
  } catch (error) {
    throw new Error(`Ошибка при получении списка фильмов: ${error}`);
  }
};
