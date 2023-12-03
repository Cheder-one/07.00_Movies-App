import { Component } from 'react';
import { Col } from 'antd';

import {
  fetchMoviesByPopular,
  fetchGenres,
} from './app/service/requestMethods';
import MovieGallery from './app/components/movieGallery/MovieGallery';
import './App.scss';

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
    console.log(movies);

    return !isLoading ? (
      <Col span={18} offset={3}>
        <MovieGallery movies={movies.results} genres={genres} />
      </Col>
    ) : (
      <div>Loading...</div>
    );
  }
}

export default App;
