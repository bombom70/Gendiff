import _ from 'lodash';

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

const stringify = (value, depth) => {
  const str = JSON.stringify(value);
  if (_.isObject(value)) {
    return str.split('').map((element) => {
      if (element === '{') {
        return `{\n${createSpace(depth + 1)}`;
      }
      if (element === '}') {
        return `\n${createSpace(depth - 1)}}`;
      }
      if (element === ':') {
        return ': ';
      }
      if (element === '"') {
        return '';
      }
      return element;
    }).join('');
  }
  return value;
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
        return `${createSpace(depth)}${selectSign(node.type)} ${node.name}: ${stringify(node.value, depth + 2)}`;
      case 'changed':
        return [`${createSpace(depth)}- ${node.name}: ${stringify(node.valueBefore, depth + 2)}`, `${createSpace(depth)}+ ${node.name}: ${stringify(node.valueAfter, depth + 2)}`];
      case 'unchanged':
        return `${createSpace(depth)}${selectSign(node.type)} ${node.name}: ${stringify(node.value, depth + 2)}`;
      case 'deleted':
        return `${createSpace(depth)}${selectSign(node.type)} ${node.name}: ${stringify(node.value, depth + 2)}`;
      default:
        throw new Error(`property ${node.type} is not corrected`);
    }
  });
  return `{\n${_.flattenDeep(result).join('\n')}\n${createSpace(depth - 1)}}`;
};

export default treeRender;
