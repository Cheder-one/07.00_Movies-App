import { Component } from 'react';
import PropTypes from 'prop-types';

import { getSessionRatedMovies } from '../../service';
import MovieGallery from '../components/movieGallery/MovieGallery';
import Loader from '../components/loader/Loader';
import { Pagination } from '../components';

class RatedMoviesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ratedMovies: [],
      isLoading: true,
      currPage: 1,
    };
  }

  async componentDidMount() {
    this.loadData();
  }

  async componentDidUpdate(pvp, pvs) {
    const { isLoading, ratedMovies } = this.state;

    if (!isLoading && pvp.tabKey !== 'rated') {
      this.loadData(700);
    }

    if (pvs.ratedMovies !== ratedMovies) {
      this.setState({ isLoading: false });
    }
  }

  handlePageChange = (page) => {
    const cb = () => this.setRatedMovies(page);
    this.setState({ isLoading: true });
    this.setState({ currPage: page }, cb);
  };

  setRatedMovies = async (page) => {
    const ratedMovies = await getSessionRatedMovies(page);
    this.setState({ ratedMovies });
  };

  async loadData(serverUpdDelay = 1000) {
    this.setState({ isLoading: true });

    await new Promise((resolve) => {
      setTimeout(resolve, serverUpdDelay);
    });

    this.setRatedMovies();
  }

  render() {
    const { genres } = this.props;
    const { ratedMovies, isLoading, currPage } = this.state;

    return !isLoading ? (
      <>
        <MovieGallery movies={ratedMovies.results} genres={genres} />
        <Pagination
          currPage={currPage}
          totalItems={ratedMovies.total_results}
          onPageChange={this.handlePageChange}
        />
      </>
    ) : (
      <Loader />
    );
  }
}

RatedMoviesPage.propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RatedMoviesPage;
