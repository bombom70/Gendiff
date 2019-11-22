import stringify from './stringify';

const repeat = num => ' '.repeat(num);
export const createSpace = (depth) => {
  switch (depth) {
    case 0:
      return repeat(2);
    case 1:
      return repeat(4);
    case 2:
      return repeat(6);
    case 3:
      return repeat(8);
    case 4:
      return repeat(10);
    default:
      return repeat(0);
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
    try {
      switch (node.type) {
        case 'changeInside':
          return `${createSpace(depth)}${selectSign(node.type)} ${node.name}: ${treeRender(node.children, depth + 2)}`;
        case 'added':
          return `${createSpace(depth)}${selectSign(node.type)} ${node.name}: ${stringify(node.value, depth)}`;
        case 'changed':
          return `${createSpace(depth)}- ${node.name}: ${stringify(node.valueBefore, depth)}\n${createSpace(depth)}+ ${node.name}: ${stringify(node.valueAfter, depth)}`;
        case 'unchanged':
          return `${createSpace(depth)}${selectSign(node.type)} ${node.name}: ${stringify(node.value, depth)}`;
        case 'deleted':
          return `${createSpace(depth)}${selectSign(node.type)} ${node.name}: ${stringify(node.value, depth)}`;
        default:
          throw new Error();
      }
    } catch (e) {
      console.log('Error');
    }
    return node;
  });
  return `{\n${result.join('\n')}\n${createSpace(depth - 1)}}`;
};

export default treeRender;
