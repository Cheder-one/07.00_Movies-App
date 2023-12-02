import { Component } from 'react';

import MovieGallery from './app/components/movieGallery/MovieGallery';
import {
  fetchMoviesByPopular,
  fetchGenres,
} from './app/components/service/requestMethods';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      genres: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    try {
      this.setState({
        movies: await fetchMoviesByPopular(),
        genres: await fetchGenres(),
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { isLoading, movies, genres } = this.state;

    return !isLoading ? (
      <MovieGallery movies={movies.results} genres={genres} />
    ) : (
      <div>Loading...</div>
    );
  }
}

export default App;
