/* eslint-disable consistent-return */
import qs from 'qs';

import { API_KEY, throwNewErr } from '../app/utils';

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
    } catch (err) {
      const info = 'Ошибка при создании гостевой сессии';
      throwNewErr(err.message, info);
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
  } catch (err) {
    const info = 'Ошибка при отправке оценки фильма на сервер';
    throwNewErr(err.message, info);
  }
};

export const deleteMovieRating = async (movieId) => {
  const guestId = qs.stringify({ guest_session_id: getGuestId() });

  try {
    const response = await movieRequest(
      'DELETE',
      `/movie/${movieId}/rating?${apiKey}&${guestId}`
    );
    return response;
  } catch (err) {
    const info = 'Ошибка при удалении оценки фильма с сервера';
    throwNewErr(err.message, info);
  }
};

export const getSessionRatedMovies = async (page = 1) => {
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
  } catch (err) {
    const info = 'Ошибка при получении списка оцененных фильмов';
    throwNewErr(err.message, info);
  }
};

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
  } catch (err) {
    const info = 'Ошибка при получении списка популярных фильмов';
    throwNewErr(err.message, info);
  }
};

export const fetchMovieGenres = async () => {
  try {
    const response = await movieRequest(
      'GET',
      `/genre/movie/list?${apiKey}`
    );
    return response.genres;
  } catch (err) {
    const info = 'Ошибка при получении списка жанров';
    throwNewErr(err.message, info);
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
  } catch (err) {
    const info = 'Ошибка при получении списка фильмов по запросу';
    throwNewErr(err.message, info);
  }
};
