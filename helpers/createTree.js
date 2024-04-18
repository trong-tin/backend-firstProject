const createTree = (arr, parentId = "") => {
  count++;
  const tree = [];
  arr.forEach((item) => {
    if (item.parent_id === parentId) {
      const newItem = item;
      newItem.index = count;
      const children = createTree(arr, item.id);
      if (children) {
        newItem.children = children;
      }
      tree.push(newItem);
    }
  });
  return tree;
};

module.exports.tree = (arr, parentId = "") => {
  count = 0;
  const tree = createTree(arr, (parentId = ""));
  return tree;
};
