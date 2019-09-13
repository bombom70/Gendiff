import parsers from './parsers';
import path from 'path';

export default (pathToFile) => {
    return parsers(path.extname(pathToFile), pathToFile);
};