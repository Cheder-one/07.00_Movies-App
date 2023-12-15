/* eslint-disable import/no-extraneous-dependencies */

import { Component } from 'react';
import { Col } from 'antd';
import { debounce } from 'lodash';

import { ConnectionAlert, Loader, NavTabs } from './app/components';
import {
  createGuestSession,
  fetchMovieGenres,
  fetchMoviesByPopular,
  fetchMoviesByQuery,
} from './service';
import './App.scss';

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

    // this.debounceQuery = new Debounce(this.getMoviesByQuery, 400);
    this.debounceQuery = debounce(this.getMoviesByQuery, 400);
  }

  async componentDidMount() {
    this.setState({
      movies: await fetchMoviesByPopular(),
      genres: await fetchMovieGenres(),
      isLoading: false,
    });
    createGuestSession();
  }

  componentDidUpdate(pp, ps) {
    const { movies } = this.state;

    if (ps.movies !== movies) {
      this.setState({ isLoading: false });
    }
  }

  getMoviesByQuery = async (query, page) => {
    const setMovies = async () => {
      const movies = await fetchMoviesByQuery(query, page);
      this.setState({ movies });
    };

    this.setState({ isLoading: true }, setMovies);
  };

  getMoviesByPopular = async (page) => {
    this.setState({
      movies: await fetchMoviesByPopular(page),
    });
  };

  getMoviesOnPage = (isDebounce) => {
    const { query, page } = this.state;

    if (!query) {
      this.getMoviesByPopular(page);
    } else if (isDebounce) {
      this.debounceQuery(query, page);
    } else {
      this.getMoviesByQuery(query, page);
    }
  };

  handleInputChange = async (query) => {
    const value = query.trim();
    const cb = () => this.getMoviesOnPage(true);

    this.setState({ page: 1 });
    this.setState({ query: value }, cb);
  };

  handlePageChange = (pageNum) => {
    this.setState({ isLoading: true });

    const cb = () => this.getMoviesOnPage();
    this.setState({ page: pageNum }, cb);
  };

  render() {
    const { isLoading, movies, genres, page } = this.state;

    return (
      <>
        {!isLoading ? (
          <Col
            className="content-wrapper content-wrapper--box"
            xs={{ offset: 0, span: 24 }}
            xl={{ offset: 3, span: 18 }}
          >
            <NavTabs
              currPage={page}
              totalItems={movies.total_results}
              movies={movies}
              genres={genres}
              onInputChange={this.handleInputChange}
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
