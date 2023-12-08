import { Tabs } from 'antd';

import './NavTabs.scss';
import Search from '../search/Search';

const createTabItem = (item, name) => ({
  label: name,
  key: name,
  children: item,
});

function NavTabs({ onInputChange }) {
  const renderSearch = <Search {...{ onInputChange }} />;
  const renderRated = <h1>Rated</h1>;

  return (
    <Tabs
      items={[
        createTabItem(renderSearch, 'Search'),
        createTabItem(renderRated, 'Rated'),
      ]}
      centered
      defaultActiveKey="1"
    />
  );
}

export default NavTabs;
