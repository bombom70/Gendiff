import _ from 'lodash/fp';
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
    add: '+',
    deleted: '-',
    changeInside: ' ',
    unchanged: ' ',
    changed: ' ',
  };
  return signs[type];
};

const treeParse = (ast, depth = 0) => {
  const result = ast.map((data) => {
    if (_.has('children', data)) {
      if (depth > 0) {
        return `${repeat(8)}${data.name}: ${treeParse(data.children, depth + 1)}\n`;
      }
      return `${repeat(4)}${data.name}: ${treeParse(data.children, depth + 1)}\n`;
    }
    if (depth === 2) {
      return `${repeat(10)}${selectSign(data.type)} ${data.name}: ${data.value}\n`;
    }
    if (data.type === 'changed') {
      return `${repeat(6)}- ${data.name}: ${stringify(data.valueBefore)}\n${repeat(6)}+ ${data.name}: ${stringify(data.valueAfter)}\n`;
    }
    if (depth > 0) {
      return `${repeat(6)}${selectSign(data.type)} ${data.name}: ${stringify(data.value, depth)}\n`;
    }
    if (depth === 0) {
      return `${repeat(2)}${selectSign(data.type)} ${data.name}: ${stringify(data.value, depth)}\n`;
    }
    return `${repeat(10)}${selectSign(data.type)} ${data.name}: ${stringify(data.value, depth)}\n`;
  });
  return `{\n${result.join('')}${createSpace(depth)}}`;
};

export default treeParse;
