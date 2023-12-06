import { Tabs } from 'antd';

import './NavTabs.scss';
import Search from '../search/Search';

const createTabItem = (item, name) => {
  return {
    label: name,
    key: name,
    children: item,
  };
};

function NavTabs() {
  const items = [
    createTabItem(<Search />, 'Search'),
    createTabItem(<h1>Rated</h1>, 'Rated'),
  ];

  return <Tabs items={items} centered defaultActiveKey="1" />;
}

export default NavTabs;
