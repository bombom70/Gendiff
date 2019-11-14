import path from 'path';
import fs from 'fs';
import parse from './parser';
import myParse from './formatters';
import render from './buildAst';

export default (filepath1, filepath2, format) => {
  const filetype1 = path.parse(`${__dirname}${filepath1}`).ext.replace('.', '');
  const filetype2 = path.parse(`${__dirname}${filepath2}`).ext.replace('.', '');
  const before = parse(filetype1, fs.readFileSync(filepath1, 'utf-8'));
  const after = parse(filetype2, fs.readFileSync(filepath2, 'utf-8'));
  const ast = render(before, after);
  return myParse(ast, format);
};
