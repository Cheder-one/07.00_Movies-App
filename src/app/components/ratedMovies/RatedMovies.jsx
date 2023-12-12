import { Component } from 'react';
import PropTypes from 'prop-types';

import { getSessionRatedMovies } from '../../../service';
import MovieGallery from '../movieGallery/MovieGallery';
import Loader from '../loader/Loader';

class RatedMovies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ratedMovies: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    this.loadData();
  }

  async componentDidUpdate(prevProps) {
    const { tabKey } = this.props;
    if (prevProps.tabKey !== tabKey) {
      this.loadData(500);
    }
  }

  async loadData(serverUpdDelay) {
    this.setState({ isLoading: true });

    if (serverUpdDelay)
      await new Promise((resolve) => {
        setTimeout(resolve, serverUpdDelay);
      });

    const ratedMovies = await getSessionRatedMovies();

    this.setState({
      ratedMovies,
      isLoading: false,
    });
  }

  render() {
    const { genres } = this.props;
    const { ratedMovies, isLoading } = this.state;

    return !isLoading ? (
      <MovieGallery movies={ratedMovies.results} genres={genres} />
    ) : (
      <Loader />
    );
  }
}

RatedMovies.propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  tabKey: PropTypes.string.isRequired,
};

export default RatedMovies;
