import { Component } from 'react';
import { Col } from 'antd';

import './App.scss';
import {
  ConnectionAlert,
  Loader,
  NavTabs,
  Pagination,
} from './app/components';
import {
  createGuestSession,
  fetchMovieGenres,
  fetchMoviesByPopular,
  fetchMoviesByQuery,
} from './service';
import { Debounce } from './app/hooks';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      genres: [],
      query: '',
      page: 1,
      isLoading: true,
    };

    this.debounceQuery = new Debounce(this.getMoviesByQuery, 400);
  }

  async componentDidMount() {
    this.setState({
      movies: await fetchMoviesByPopular(),
      genres: await fetchMovieGenres(),
      isLoading: false,
    });
    createGuestSession();
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

  getMoviesPage = (isDebounce) => {
    const { query, page } = this.state;
    const { debFunc } = this.debounceQuery;

    if (!query) {
      this.getMoviesByPopular(page);
    } else if (isDebounce) {
      debFunc(query, page);
    } else {
      this.getMoviesByQuery(query, page);
    }
  };

  handleInputChange = async (query) => {
    const value = query.trim();
    const cb = () => this.getMoviesPage(true);

    this.setState({ page: 1 });
    this.setState({ query: value }, cb);
  };

  handlePageChange = (pageNum) => {
    const cb = () => this.getMoviesPage(true);
    this.setState({ page: pageNum }, cb);
  };

  // TODO Реализовать mobile версию

  render() {
    const { isLoading, movies, genres, page } = this.state;

    return (
      <>
        {!isLoading ? (
          <Col className="content-wrapper" span={18} offset={3}>
            <NavTabs
              movies={movies.results}
              genres={genres}
              onInputChange={this.handleInputChange}
            />
            <Pagination
              currPage={page}
              totalItems={movies.total_results}
              onPageChange={this.handlePageChange}
            />
          </Col>
        ) : (
          <Loader />
        )}
        <ConnectionAlert />
      </>
    );
  }
}

export default App;
