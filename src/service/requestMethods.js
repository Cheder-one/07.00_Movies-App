// eslint-disable-next-line
import qs from 'qs';

import movieRequest from './movieRequest';

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

  const response = await movieRequest(
    'GET',
    `/discover/movie?${params}`
  );
  return response;
};

export const fetchMovieGenres = async () => {
  // prettier-ignore
  const response = await movieRequest(
    'GET', 
    `/genre/movie/list`
  );
  return response.genres;
};

export const fetchMoviesByQuery = async (query, page) => {
  const params = qs.stringify({
    query,
    page,
    language: 'ru-RU',
    include_adult: false,
  });

  const response = await movieRequest(
    'GET',
    `/search/movie?${params}`
  );
  return response;
};
