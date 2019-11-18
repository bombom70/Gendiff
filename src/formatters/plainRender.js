import _ from 'lodash/fp';

const plainRender = (ast, acc = '') => {
  const result = ast.map((node) => {
    const getValue = _.isObject(node.value) ? '[complex value]' : node.value;
    const getValueFromObject = _.isObject(node.valueAfter) || _.isObject(node.valueAfter) ? '[complex value]' : node.valueAfter;
    if (node.type === 'changeInside') {
      return plainRender(node.children, `${acc}${node.name}.`);
    }
    if (node.type === 'added') {
      return `Property '${acc}${node.name}' was added with value: ${getValue}`;
    }
    if (node.type === 'changed') {
      if (_.isObject(node.valueBefore) || _.isObject(node.valueAfter)) {
        return `Property '${acc}${node.name}' was added with value: ${getValueFromObject}`;
      }
      return `Property '${acc}${node.name}' was updated. From ${node.valueBefore} to ${node.valueAfter}`;
    }
    if (node.type === 'deleted') {
      return `Property '${acc}${node.name}' was removed`;
    }
    return `Property '${acc}${node.name}' not changed`;
  });
  return result.join('\n');
};

export default plainRender;
