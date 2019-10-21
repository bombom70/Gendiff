import _ from 'lodash/fp';

const plainFormat = (ast, acc = '') => {
  const result = ast.map((data) => {
    const getValue = _.isObject(data.value) ? '[complex value]' : data.value;
    if (_.isObject(data.value) || _.isObject(data.valueBefore) || _.isObject(data.valueAfter)) {
      return `Property '${acc}${data.name}' was removed\n`;
    }
    if (data.type === 'add') {
      return `Property '${acc}${data.name}' was added with value: ${getValue}\n`;
    }
    if (data.type === 'changed') {
      return `Property '${acc}${data.name}' was updated. From ${data.valueBefore} to ${data.valueAfter}\n`;
    }
    return plainFormat(data.children, `${acc}${data.name}.`);
  });
  return result.join('');
};

export default plainFormat;
