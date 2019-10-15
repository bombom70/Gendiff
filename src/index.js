import _ from 'lodash/fp';
import stringify from './stringify';

const repeat = num => ' '.repeat(num);
const space = (num) => {
  if (num === 2) {
    return repeat(8);
  }
  if (num === 1) {
    return repeat(4);
  }
  if (num === 0) {
    return repeat(0);
  }
};

export const render = (before, after) => {
  const beforeKeys = Object.keys(before);
  const afterKeys = Object.keys(after);
  const keys = _.union(beforeKeys, afterKeys);
  keys.sort();

  const result = keys.map((key) => {
    if (before[key] instanceof Object && after[key] instanceof Object) {
      return {
        name: key,
        value: '',
        type: 'changeInside',
        children: render(before[key], after[key]),
      };
    }
    if (!_.has(key, before)) {
      return {
        name: `+ ${key}`,
        value: after[key],
        type: 'add',
        children: [],
      };
    }
    if (!_.has(key, after)) {
      return {
        name: `- ${key}`,
        value: before[key],
        type: 'deleted',
        children: [],
      };
    }
    if (before[key] === after[key]) {
      return {
        name: `  ${key}`,
        value: after[key],
        type: 'unchanged',
        children: [],
      };
    }
    return {
      name: '',
      valueBefore: `- ${key}: ${stringify(before[key])}`,
      valueAfter: `+ ${key}: ${stringify(after[key])}`,
      type: 'changed',
      children: [],
    };
  });
  return result;
};

export const parse = (ast, depth = 0) => {
  const result = ast.map((data) => {
    if (data.children.length > 0) {
      if (depth > 0) {
        return `${repeat(8)}${data.name}: ${parse(data.children, depth + 1)}\n`;
      }
      return `${repeat(4)}${data.name}: ${parse(data.children, depth + 1)}\n`;
    }
    if (depth === 2) {
      return `${repeat(10)}${data.name}: ${data.value}\n`;
    }
    if (data.type === 'changed') {
      console.log(depth);
      return `${repeat(6)}${data.valueBefore}\n${repeat(6)}${data.valueAfter}\n`;
    }
    if (depth > 0) {
      return `${repeat(6)}${data.name}: ${stringify(data.value, depth)}\n`;
    }
    if (depth === 0) {
      return `${repeat(2)}${data.name}: ${stringify(data.value, depth)}\n`;
    }
    return `${repeat(10)}${data.name}: ${stringify(data.value, depth)}\n`;
  });
  return `{\n${result.join('')}${space(depth)}}`;
};

export default (obj1, obj2) => {
  const ast = render(obj1, obj2);
  return parse(ast);
};
