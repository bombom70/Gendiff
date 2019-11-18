import stringify from './stringify';

const repeat = num => ' '.repeat(num);
const createSpaceEnd = (num) => {
  switch (num) {
    case 2:
      return repeat(8);
    case 1:
      return repeat(4);
    default:
      return repeat(0);
  }
};
const createSpace = (depth) => {
  switch (depth) {
    case 0:
      return repeat(2);
    case 1:
      return repeat(6);
    case 2:
      return repeat(10);
    default:
      return repeat(10);
  }
};
const selectSign = (type) => {
  const signs = {
    added: '+',
    deleted: '-',
    changeInside: ' ',
    unchanged: ' ',
    changed: ' ',
  };
  return signs[type];
};

const treeRender = (ast, depth = 0) => {
  const result = ast.map((node) => {
    switch (node.type) {
      case 'changeInside':
        return `${createSpace(depth)}${selectSign(node.type)} ${node.name}: ${treeRender(node.children, depth + 1)}`;
      case 'added':
        return `${createSpace(depth)}${selectSign(node.type)} ${node.name}: ${stringify(node.value, depth)}`;
      case 'changed':
        return `${createSpace(depth)}- ${node.name}: ${stringify(node.valueBefore)}\n${createSpace(depth)}+ ${node.name}: ${stringify(node.valueAfter)}`;
      case 'unchanged':
        return `${createSpace(depth)}${selectSign(node.type)} ${node.name}: ${node.value}`;
      default:
        return `${createSpace(depth)}${selectSign(node.type)} ${node.name}: ${stringify(node.value, depth)}`;
    }
  });
  return `{\n${result.join('\n')}\n${createSpaceEnd(depth)}}`;
};

export default treeRender;
