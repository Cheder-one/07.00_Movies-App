import './NavTabs.scss';

import PropTypes from 'prop-types';
import { Component } from 'react';
import { Tabs } from 'antd';

import { MoviesPage, RatedMoviesPage } from '../../pages';
import { createTabItem } from '../../utils';

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
        // searchValue={props.searchValue}
        onInputChange={props.onInputChange}
        onPageChange={props.onPageChange}
      />
    );
  }

  renderRated() {
    const { tabKey } = this.state;
    const { genres } = this.props;
    return <RatedMoviesPage {...{ genres, tabKey }} />;
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
  // searchValue: PropTypes.string.isRequired,
  currPage: PropTypes.number.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default NavTabs;
