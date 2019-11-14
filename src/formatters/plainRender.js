import _ from 'lodash/fp';

const plainRender = (ast, acc = '') => {
  const result = ast.map((data) => {
    const getValue = _.isObject(data.value) ? '[complex value]' : data.value;
    const getValueFromObject = _.isObject(data.valueAfter) || _.isObject(data.valueAfter) ? '[complex value]' : data.valueAfter;
    if (data.type === 'changeInside') {
      return plainRender(data.children, `${acc}${data.name}.`);
    }
    if (data.type === 'added') {
      return `Property '${acc}${data.name}' was added with value: ${getValue}`;
    }
    if (data.type === 'changed') {
      if (_.isObject(data.valueBefore) || _.isObject(data.valueAfter)) {
        return `Property '${acc}${data.name}' was added with value: ${getValueFromObject}`;
      }
      return `Property '${acc}${data.name}' was updated. From ${data.valueBefore} to ${data.valueAfter}`;
    }
    if (data.type === 'deleted') {
      return `Property '${acc}${data.name}' was removed`;
    }
    return `Property '${acc}${data.name}' not changed`;
  });
  return result.join('\n');
};

export default plainRender;
