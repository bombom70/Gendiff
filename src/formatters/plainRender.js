import _ from 'lodash/fp';

const getValue = value => (_.isObject(value) ? '[complex value]' : value);

const strBuild = (valueBefore, valueAfter) => {
  if (_.isObject(valueAfter)) {
    return ': [complex value]';
  }
  return `. From ${getValue(valueBefore)} to ${getValue(valueAfter)}`;
};

const plainRender = (ast, acc = '') => {
  const result = ast.map((node) => {
    switch (node.type) {
      case 'changeInside':
        return plainRender(node.children, `${acc}${node.name}.`);
      case 'added':
        return `Property '${acc}${node.name}' was added with value: ${getValue(node.value)}`;
      case 'changed':
        return `Property '${acc}${node.name}' was updated${strBuild(node.valueBefore, node.valueAfter)}`;
      case 'deleted':
        return `Property '${acc}${node.name}' was removed`;
      case 'unchanged':
        return `Property '${acc}${node.name}' not changed`;
      default:
    }
    return node;
  });
  return result.join('\n');
};

export default plainRender;
