// import genDiff from './bin/gendiff';
import _ from 'lodash';
import fs, { access } from 'fs';
import path from 'path';

// export const getDate = (pathToFile) => path.isAbsolute(pathToFile) ? pathToFile : path.resolve(__dirname, pathToFile);

const searchDifferenceArr = (arr1, arr2) => {
    const diff = arr1.filter(e => !arr2.includes(e));

    return diff[0];
};

export default (pathToFile1, pathToFile2) => {
    const before = JSON.parse(fs.readFileSync(pathToFile1));
    const after = JSON.parse(fs.readFileSync(pathToFile2)); 
  
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