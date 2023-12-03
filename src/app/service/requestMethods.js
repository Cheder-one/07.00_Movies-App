import movieRequest from './movieRequest';

export const fetchMoviesByPopular = () => {
  const queryString = `include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`;

  return movieRequest('GET', `/discover/movie?${queryString}`)
    .then((response) => response)
    .catch((error) => console.log(error));
};

export const fetchGenres = () => {
  return movieRequest('GET', `/genre/movie/list`)
    .then((response) => response.genres)
    .catch((error) => console.log(error));
};

export const fetchMoviesByQuery = (query, page) => {
  const params = `query=${query}&include_adult=false&language=ru-RU&page=${page}`;

  movieRequest('GET', `/search/movie?${params}`)
    .then((response) => response)
    .catch((err) => console.log(err));
};
