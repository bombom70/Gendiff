const plainFormat = (ast, acc = '', depth = 0) => {
  const result = ast.map((data) => {
    const selectValue = depth === 0 ? '[complex value]' : data.value;
    // eslint-disable-next-line max-len
    if (data.value instanceof Object || data.valueBefore instanceof Object || data.valueAfter instanceof Object) {
      return `Property '${acc}${data.name}' was removed\n`;
    }
    if (data.type === 'add') {
      return `Property '${acc}${data.name}' was added with value: ${selectValue}\n`;
    }
    if (data.type === 'changed') {
      return `Property '${acc}${data.name}' was updated. From ${data.valueBefore} to ${data.valueAfter}\n`;
    }
    return plainFormat(data.children, `${acc}${data.name}.`, depth + 1);
  });
  return result.join('');
};

export default plainFormat;
