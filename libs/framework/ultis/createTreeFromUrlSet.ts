import { searchTree, TreeNode } from './tree';

type UrlSet = { path: string; title: string }[];

const addToTree = (node, treeNodes: TreeNode[]): TreeNode[] => {
  if (node.path === '/') {
    treeNodes.push();

    return [{
      value: '/',
      title: node.title,
      children: treeNodes
    }];
  }

  const pathParts = node.path.split('/');

  let prevPath = '/';
  let currentPath = '';

  for (const pathPart of pathParts) {
    if (!pathPart) {
      continue;
    }

    currentPath += '/' + pathPart;

    const parentNode = searchTree(treeNodes, 'children', 'value', prevPath);

    if (parentNode) {
      const needsToAdd = !parentNode.children!.find(o => o.value === currentPath);
      if (needsToAdd) {
        parentNode.children!.push({
          value: currentPath,
          title: node.title,
          children: []
        });
      }
    }
    else {
      treeNodes.push({
        value: node.path,
        title: node.title,
        children: []
      });
    }

    prevPath = currentPath;
  }

  return treeNodes;
};

const sortUrlSet = (urlSet: UrlSet) => {
  return urlSet.sort((a, b) => {
    if (a.path < b.path) {
      return -1;
    }
    if (a.path > b.path) {
      return 1;
    }
    return 0;
  });
};

export const createTreeFromUrlSet = (urlSet: UrlSet) => {
  let tree: TreeNode[] = [];

  const sortedSet = sortUrlSet(urlSet);

  for (let i = 0; i < sortedSet.length; i++) {
    const node = sortedSet[i];
    tree = addToTree(node, tree);
  }

  return tree;
};