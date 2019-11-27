import _ from 'lodash/fp';

const getValue = value => (_.isObject(value) ? '[complex value]' : value);

const strBuild = (valueBefore, valueAfter) => {
  if (_.isObject(valueAfter)) {
    return ': [complex value]';
  }
  return `. From ${getValue(valueBefore)} to ${getValue(valueAfter)}`;
};

const plainRender = (ast, ancestry = '') => {
  const result = ast.map((node) => {
    switch (node.type) {
      case 'changeInside':
        return plainRender(node.children, `${ancestry}${node.name}.`);
      case 'added':
        return `Property '${ancestry}${node.name}' was added with value: ${getValue(node.value)}`;
      case 'changed':
        return `Property '${ancestry}${node.name}' was updated${strBuild(node.valueBefore, node.valueAfter)}`;
      case 'deleted':
        return `Property '${ancestry}${node.name}' was removed`;
      case 'unchanged':
        return `Property '${ancestry}${node.name}' not changed`;
      default:
        throw new Error('property is not corrected');
    }
  });
  return result.join('\n');
};

export default plainRender;
