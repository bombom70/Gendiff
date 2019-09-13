import _ from 'lodash/fp';

const genDiff = (before, after) => {
  console.log(before);
  console.log(after);
  // const before = parsers(path.extname(pathToFile1), pathToFile1);
  // const after = parsers(path.extname(pathToFile2), pathToFile2);
  const keysBefore = Object.keys(before);
  const keysAfter = Object.keys(after);

  const keysSet = _.union(keysBefore, keysAfter);

  const result = keysSet.map(key => {
    if (_.has(keysBefore, key) && _.has(keysAfter, key) && (keysBefore === keysAfter)) {
      return `${keysAfter}`;
    }
    
  });

  return result.join('');
};

// const buildAst = (before, after) => {
//   // const before = parsers(path.extname(pathToFile1), pathToFile1);
//   // const after = parsers(path.extname(pathToFile2), pathToFile2);
//   const keysBefore = Object.keys(before);
//   const keysAfter = Object.keys(after);

//   const keysSet = _.union(keysBefore, keysAfter);

//   const result = keysSet.reduce((acc, val) => {
//     if (_.has(before, val) && (_.has(after, val))) {
//       if (before[val] instanceof Object && after[val] instanceof Object) {
//         return [...acc, { [val]: buildAst(before[val], after[val]) }];
//       }
//       if (before[val] !== after[val]) {
//         return [...acc, { [`+`]: `${val}: ${stringify(after[val])}` }, { [`-`]: `${val}: ${stringify(before[val])}` }];
//       }
//       return [...acc, { [` `]: `${val}: ${stringify(after[val])}` }];
//     }
//     if (!_.has(before, val)) {
//       return [...acc, { [`+`]: `${val}: ${stringify(after[val])}` }];
//     }
//     return [...acc, { [`-`]: `${val}: ${stringify(before[val])}` }];
//   }, []);
//   return result;
// };

export default genDiff;
