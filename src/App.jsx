import { Component } from 'react';
import { Col } from 'antd';

import './App.scss';
import {
  Loader,
  MovieGallery,
  NavTabs,
  Pagination,
} from './app/components';
import {
  fetchMovieGenres,
  fetchMoviesByPopular,
  fetchMoviesByQuery,
} from './service';
import { Debounce } from './app/hooks';
import ConnectionCheck from './app/hooks/Classes/ConnectionCheck';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      genres: [],
      isLoading: true,
      searchQuery: '',
      page: 1,
    };

    this.debounceQuery = new Debounce(this.getMoviesByQuery, 400);
    this.connectionCheck = new ConnectionCheck();
  }

  async componentDidMount() {
    this.setState({
      movies: await fetchMoviesByPopular(),
      genres: await fetchMovieGenres(),
      isLoading: false,
    });

    this.connectionCheck.didMount(
      () => {
        console.log('Online callback');
        // Ваш код при онлайне
      },
      () => {
        console.log('Offline callback');
        // Ваш код при оффлайне
      }
    );
  }

  componentWillUnmount() {
    this.connectionCheck.willUnmount();
  }

  getMoviesByQuery = async (query, page) => {
    this.setState({
      movies: await fetchMoviesByQuery(query, page),
    });
  };

  getMoviesByPopular = async (page) => {
    this.setState({
      movies: await fetchMoviesByPopular(page),
    });
  };

  getMovies = (isDebounce) => {
    const { searchQuery, page } = this.state;

    if (!searchQuery) {
      this.getMoviesByPopular(page);
      return;
    }
    if (isDebounce) {
      this.debounceQuery.debFunc(searchQuery, page);
    } else {
      this.getMoviesByQuery(searchQuery, page);
    }
  };

  handleInputChange = async (query) => {
    const value = query.trim();
    this.setState({ page: 1 });
    this.setState({ searchQuery: value }, () => this.getMovies(true));
  };

  handlePageChange = (pageNum) => {
    this.setState({ page: pageNum }, () => this.getMovies());
  };

  render() {
    const { isLoading, movies, genres, page } = this.state;

    return !isLoading ? (
      <Col className="content-wrapper" span={18} offset={3}>
        <NavTabs onInputChange={this.handleInputChange} />
        <MovieGallery movies={movies.results} genres={genres} />
        <Pagination
          currPage={page}
          totalItems={movies.total_results}
          onPageChange={this.handlePageChange}
        />
      </Col>
    ) : (
      <Loader />
    );
  }
}

export default App;
