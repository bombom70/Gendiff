import _ from 'lodash/fp';
import path from 'path';
import stringify from './stringify';
import parse from './parser';
import plainFormat from './formatters/plainFormat';
import jsonFormat from './formatters/jsonFormat';

const repeat = num => ' '.repeat(num);
const space = (num) => {
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

const render = (before, after) => {
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
        name: key,
        value: after[key],
        type: 'add',
        children: [],
      };
    }
    if (!_.has(key, after)) {
      return {
        name: key,
        value: before[key],
        type: 'deleted',
        children: [],
      };
    }
    if (before[key] === after[key]) {
      return {
        name: key,
        value: after[key],
        type: 'unchanged',
        children: [],
      };
    }
    return {
      name: key,
      valueBefore: before[key],
      valueAfter: after[key],
      type: 'changed',
      children: [],
    };
  });
  return result;
};

const myParse = (ast, depth = 0) => {
  const result = ast.map((data) => {
    if (data.children.length > 0) {
      if (depth > 0) {
        return `${repeat(8)}${data.name}: ${myParse(data.children, depth + 1)}\n`;
      }
      return `${repeat(4)}${data.name}: ${myParse(data.children, depth + 1)}\n`;
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
  return `{\n${result.join('')}${space(depth)}}`;
};

export default (pathToFile1, pathToFile2, format) => {
  const before = parse(path.extname(`${__dirname}${pathToFile1}`), pathToFile1);
  const after = parse(path.extname(`${__dirname}${pathToFile2}`), pathToFile2);
  const ast = render(before, after);
  if (format === 'plain') {
    return plainFormat(ast);
  }
  if (format === 'json') {
    return jsonFormat(ast);
  }
  return myParse(ast);
};
