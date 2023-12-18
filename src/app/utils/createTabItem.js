const createTabItem = (node, name) => ({
  label: name,
  key: name.toLowerCase(),
  children: node,
});

export default createTabItem;
