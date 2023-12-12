import PropTypes from 'prop-types';
import { Component } from 'react';
import { Tabs } from 'antd';

import './NavTabs.scss';
import RatedMovies from '../ratedMovies/RatedMovies';
// eslint-disable-next-line import/no-cycle
import { MoviesPage } from '../../layout';

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
    const { props } = this;
    return (
      <MoviesPage
        movies={props.movies}
        genres={props.genres}
        currPage={props.currPage}
        onInputChange={props.onInputChange}
        onPageChange={props.onPageChange}
      />
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
        className="nav-tabs nav-tabs--box"
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

NavTabs.propTypes = {
  movies: PropTypes.object.isRequired,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  currPage: PropTypes.number.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default NavTabs;
