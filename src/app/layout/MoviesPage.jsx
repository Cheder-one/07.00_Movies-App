import { MovieGallery } from '../components';

function MoviesPage({ movies, genres }) {
  return <MovieGallery movies={movies} genres={genres} />;
}

export default MoviesPage;
