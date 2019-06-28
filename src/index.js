// import genDiff from './bin/gendiff';
import _ from 'lodash';
import path from 'path';
import parsers from './parsers';

const searchDifferenceArr = (arr1, arr2) => {
    const diff = arr1.filter(e => !arr2.includes(e));

    return diff[0];
};

export default (pathToFile1, pathToFile2) => {
    const before = parsers(path.extname(pathToFile1), pathToFile1);
    const after = parsers(path.extname(pathToFile2), pathToFile2);
    const keysBefore = Object.keys(before);
    const keysAfter = Object.keys(after);

    const differenceArr = searchDifferenceArr(keysAfter, keysBefore);

    const result = keysBefore.reduce((acc, val) => {
        if (before[val] === after[val]) {
            acc += `\t  ${val}: ${after[val]}\n`;
        } else if (_.has(after, val)) {
            acc += `\t+ ${val}: ${after[val]}\n\t- ${val}: ${before[val]}\n`;
        } else {
            acc += `\t- ${val}: ${before[val]}\n`;
        }
        return acc ;
    }, '{\n');

    return result + `\t+ ${differenceArr}: ${after[differenceArr]}\n}`;
};