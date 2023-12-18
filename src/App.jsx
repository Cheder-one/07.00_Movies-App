import './App.scss';

import { Component } from 'react';
import { debounce } from 'lodash';
import { Col } from 'antd';

import {
  createGuestSession,
  fetchMovieGenres,
  fetchMoviesByPopular,
  fetchMoviesByQuery,
} from './service';
import {
  ConnectionAlert,
  Error,
  Loader,
  NavTabs,
} from './app/components';
import { GenreContext, SearchContext } from './app/contexts';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      genres: [],
      page: 1,
      query: '',
      error: '',
      isLoading: true,
    };

    this.debounceQuery = debounce(this.getMoviesByQuery, 1000);
  }

  async componentDidMount() {
    try {
      this.setState({
        movies: await fetchMoviesByPopular(),
        genres: await fetchMovieGenres(),
      });
    } catch (error) {
      this.setState({ error: error.info });
    } finally {
      createGuestSession();
    }
  }

  async componentDidUpdate(pvp, pvs) {
    const { movies } = this.state;

    if (pvs.movies !== movies) {
      this.setState({ isLoading: false });
    }
  }

  handleError = async (error) => {
    const movies = await fetchMoviesByPopular(1);
    this.setState({
      movies,
      page: 1,
      isLoading: false,
      error: error.info,
    });
  };

  getMoviesByQuery = (query, page) => {
    if (!query.trim()) return;

    try {
      const cb = async () => {
        const movies = await fetchMoviesByQuery(query, page);
        this.setState({ movies });
      };

      this.setState({ isLoading: true }, cb);
    } catch (error) {
      this.handleError(error);
    }
  };

  getMoviesByPopular = (page) => {
    const cb = async () => {
      try {
        const movies = await fetchMoviesByPopular(page);
        this.setState({ movies });
      } catch (error) {
        this.handleError(error);
      }
    };

    this.setState({ isLoading: true }, cb);
  };

  getMoviesOnPage = (isDebounce) => {
    const { query, page } = this.state;

    if (!query) {
      this.debounceQuery.cancel();
      this.getMoviesByPopular(page);
    } else if (isDebounce) {
      this.debounceQuery(query, page);
    } else {
      this.getMoviesByQuery(query, page);
    }
  };

  handleInputChange = async (query) => {
    const cb = () => this.getMoviesOnPage(true);
    this.setState({ page: 1 });
    this.setState({ query }, cb);
  };

  handlePageChange = (pageNum) => {
    const cb = () => this.getMoviesOnPage();
    this.setState({ isLoading: true });
    this.setState({ page: pageNum }, cb);
  };

  render() {
    const { isLoading, movies, genres, page, query, error } =
      this.state;

    return (
      <>
        {!isLoading ? (
          <Col
            className="content-wrapper content-wrapper--box"
            xs={{ offset: 0, span: 24 }}
            xl={{ offset: 3, span: 18 }}
          >
            <SearchContext.Provider value={query}>
              <GenreContext.Provider value={genres}>
                <NavTabs
                  movies={movies}
                  currPage={page}
                  totalItems={movies.total_results}
                  onInputChange={this.handleInputChange}
                  onPageChange={this.handlePageChange}
                />
              </GenreContext.Provider>
            </SearchContext.Provider>
          </Col>
        ) : (
          <Loader />
        )}
        {error && <Error error={error} />}
        <ConnectionAlert />
      </>
    );
  }
}

export default App;
