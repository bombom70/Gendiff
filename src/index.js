import path from 'path';
import parse from './parser';
import selectFormta from './formatters/index';
import buildAst from './buildAst';

export default (pathToFile1, pathToFile2, format) => {
  const before = parse(path.extname(`${__dirname}${pathToFile1}`), pathToFile1);
  const after = parse(path.extname(`${__dirname}${pathToFile2}`), pathToFile2);
  const ast = buildAst(before, after);
  return selectFormta(ast, format);
};
