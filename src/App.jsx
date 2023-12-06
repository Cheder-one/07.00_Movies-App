import { Component } from 'react';
import { Col } from 'antd';

import './App.scss';
import {
  fetchMovieGenres,
  fetchMoviesByPopular,
} from './service/requestMethods';
import { MovieGallery, NavTabs, Pagination } from './app/components';

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
        genres: await fetchMovieGenres(),
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
      <Col className="content-wrapper" span={18} offset={3}>
        <NavTabs />
        <MovieGallery movies={movies.results} genres={genres} />
        <Pagination totalItems={movies.total_results} />
      </Col>
    ) : (
      <div>Loading...</div>
    );
  }
}

export default App;
