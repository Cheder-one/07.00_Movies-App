import './NavTabs.scss';

import PropTypes from 'prop-types';
import { Component } from 'react';
import { Tabs } from 'antd';

import { createTabItem } from '../../utils';
import { MoviesPage, RatedMoviesPage } from '../../pages';
import { GenreContext, SearchContext } from '../../contexts';

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

  renderSearch(...args) {
    const { props } = this;
    const [query, genres] = args;
    return (
      <MoviesPage
        movies={props.movies}
        genres={genres}
        searchValue={query}
        currPage={props.currPage}
        onInputChange={props.onInputChange}
        onPageChange={props.onPageChange}
      />
    );
  }

  renderRated(genres) {
    const { tabKey } = this.state;
    return <RatedMoviesPage {...{ genres, tabKey }} />;
  }

  renderTabs = (query, genres) => {
    return (
      <Tabs
        className="nav-tabs nav-tabs--box"
        centered
        items={[
          createTabItem(this.renderSearch(query, genres), 'Search'),
          createTabItem(this.renderRated(genres), 'Rated'),
        ]}
        onChange={this.handleTabChange}
      />
    );
  };

  render() {
    return (
      <SearchContext.Consumer>
        {(query) => (
          <GenreContext.Consumer>
            {(genres) => this.renderTabs(query, genres)}
          </GenreContext.Consumer>
        )}
      </SearchContext.Consumer>
    );
  }
}

NavTabs.propTypes = {
  movies: PropTypes.object.isRequired,
  currPage: PropTypes.number.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default NavTabs;
