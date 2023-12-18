const createTabItem = (item, name) => ({
  label: name,
  key: name.toLowerCase(),
  children: item,
});

export default createTabItem;
