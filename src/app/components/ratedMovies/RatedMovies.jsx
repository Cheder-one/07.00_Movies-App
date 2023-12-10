import { Component } from 'react';

import { getSessionRatedMovies } from '../../../service';
import MovieGallery from '../movieGallery/MovieGallery';
import Loader from '../Loader';

class RatedMovies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ratedMovies: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    this.setState({
      ratedMovies: await getSessionRatedMovies(),
      isLoading: false,
    });
  }

  componentDidUpdate() {
    const { tabKey } = this.props;
    if (tabKey !== 'search') {
      this.handleRatedOpen();
    }
  }

  handleRatedOpen = async () => {
    this.setState({
      ratedMovies: await getSessionRatedMovies(),
    });
  };

  render() {
    const { genres, tabKey } = this.props;
    const { ratedMovies, isLoading } = this.state;

    return !isLoading ? (
      <MovieGallery movies={ratedMovies.results} genres={genres} />
    ) : (
      <Loader />
    );
  }
}

export default RatedMovies;
