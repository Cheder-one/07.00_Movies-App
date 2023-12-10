import PropTypes from 'prop-types';
import { Component } from 'react';
import { Tabs } from 'antd';

import './NavTabs.scss';
import Search from '../search/Search';
import RatedMovies from '../ratedMovies/RatedMovies';
import MovieGallery from '../movieGallery/MovieGallery';

const createTabItem = (item, name) => ({
  label: name,
  key: name.toLowerCase(),
  children: item,
});

class NavTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabKey: 'search',
    };
  }

  handleTabChange = (tabKey) => {
    this.setState({ tabKey });
  };

  renderSearch() {
    const { onInputChange, movies, genres } = this.props;
    return (
      <>
        <Search {...{ onInputChange }} />
        <MovieGallery {...{ movies, genres }} />
      </>
    );
  }

  renderRated() {
    const { tabKey } = this.state;
    const { genres } = this.props;

    return <RatedMovies {...{ genres, tabKey }} />;
  }

  render() {
    return (
      <Tabs
        items={[
          createTabItem(this.renderSearch(), 'Search'),
          createTabItem(this.renderRated(), 'Rated'),
        ]}
        centered
        onChange={this.handleTabChange}
      />
    );
  }
}

// NavTabs.propTypes = {
//   onInputChange: PropTypes.func.isRequired,
//   movies: PropTypes.array.isRequired,
//   genres: PropTypes.array.isRequired,
// };

export default NavTabs;
