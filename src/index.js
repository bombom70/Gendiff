import path from 'path';
import parse from './parser';
import selectFormta from './formatters/index';
import buildAst from './buildAst';

export default (filepath1, filepath2, format) => {
  const before = parse(path.extname(`${__dirname}${filepath1}`), filepath1);
  const after = parse(path.extname(`${__dirname}${filepath2}`), filepath2);
  const ast = buildAst(before, after);
  return selectFormta(ast, format);
};
