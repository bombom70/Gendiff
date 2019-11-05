import _ from 'lodash/fp';

const render = (valueBefore, valueAfter) => {
  const valueKeys = _.union(Object.keys(valueBefore), Object.keys(valueAfter));
  valueKeys.sort();
  const result = valueKeys.map((key) => {
    if (_.isObject(valueBefore[key]) && _.isObject(valueAfter[key])) {
      return {
        name: key,
        value: '',
        type: 'changeInside',
        children: render(valueBefore[key], valueAfter[key]),
      };
    }
    if (!_.has(key, valueBefore)) {
      return {
        name: key,
        value: valueAfter[key],
        type: 'added',
      };
    }
    if (!_.has(key, valueAfter)) {
      return {
        name: key,
        value: valueBefore[key],
        type: 'deleted',
      };
    }
    if (valueBefore[key] === valueAfter[key]) {
      return {
        name: key,
        value: valueAfter[key],
        type: 'unchanged',
      };
    }
    return {
      name: key,
      valueBefore: valueBefore[key],
      valueAfter: valueAfter[key],
      type: 'changed',
    };
  });
  return result;
};

export default render;
