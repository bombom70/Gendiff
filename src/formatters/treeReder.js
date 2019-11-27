const stringify = (value, depth) => JSON.stringify(value)
  .replace(/"/g, '')
  .replace(/{/g, `{\n${depth === 0 ? ' '.repeat(8) : ' '.repeat(12)}`)
  .replace(/:/g, ': ')
  .replace(/}/g, `\n${depth === 0 ? ' '.repeat(4) : ' '.repeat(8)}}`);


const repeat = num => ' '.repeat(num);
const createSpace = (depth) => {
  const space = 2;
  const iter = (counter, acc) => {
    if (counter < 0) {
      return acc;
    }
    const newAcc = `${repeat(space)}${acc}`;
    return iter(counter - 1, newAcc);
  };
  return iter(depth, '');
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
        throw new Error('property is not corrected');
    }
  });
  return `{\n${result.join('\n')}\n${createSpace(depth - 1)}}`;
};

export default treeRender;
