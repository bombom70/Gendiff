import _ from 'lodash/fp';

const getValue = value => (_.isObject(value) ? '[complex value]' : value);

const plainRender = (ast, ancestry = '') => {
  const result = ast.map((node) => {
    switch (node.type) {
      case 'changeInside':
        return plainRender(node.children, `${ancestry}${node.name}.`);
      case 'added':
        return `Property '${ancestry}${node.name}' was added with value: ${getValue(node.value)}`;
      case 'changed':
        return `Property '${ancestry}${node.name}' was updated. From ${getValue(node.valueBefore)} to ${getValue(node.valueAfter)}`;
      case 'deleted':
        return `Property '${ancestry}${node.name}' was removed`;
      case 'unchanged':
        return `Property '${ancestry}${node.name}' not changed`;
      default:
        throw new Error(`property ${node.type} is not corrected`);
    }
  });
  return result.join('\n');
};

export default plainRender;
