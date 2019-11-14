import stringify from './stringify';

const repeat = num => ' '.repeat(num);
const createSpace = (num) => {
  if (num === 2) {
    return repeat(8);
  }
  if (num === 1) {
    return repeat(4);
  }
  return repeat(0);
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
  const result = ast.map((data) => {
    if (data.type === 'changeInside') {
      if (depth > 0) {
        return `${repeat(8)}${data.name}: ${treeRender(data.children, depth + 1)}`;
      }
      return `${repeat(4)}${data.name}: ${treeRender(data.children, depth + 1)}`;
    }
    if (depth === 2) {
      return `${repeat(10)}${selectSign(data.type)} ${data.name}: ${data.value}`;
    }
    if (data.type === 'changed') {
      return `${repeat(6)}- ${data.name}: ${stringify(data.valueBefore)}\n${repeat(6)}+ ${data.name}: ${stringify(data.valueAfter)}`;
    }
    if (depth > 0) {
      return `${repeat(6)}${selectSign(data.type)} ${data.name}: ${stringify(data.value, depth)}`;
    }
    if (depth === 0) {
      return `${repeat(2)}${selectSign(data.type)} ${data.name}: ${stringify(data.value, depth)}`;
    }
    return `${repeat(10)}${selectSign(data.type)} ${data.name}: ${stringify(data.value, depth)}`;
  });
  return `{\n${result.join('\n')}\n${createSpace(depth)}}`;
};

export default treeRender;
