import path from 'path';
import fs from 'fs';
import parse from './parser';
import render from './formatters';
import buildAst from './buildAst';

export default (filepath1, filepath2, format) => {
  const filetree1 = path.parse(`${__dirname}${filepath1}`);
  const filetree2 = path.parse(`${__dirname}${filepath2}`);
  const filetype1 = filetree1.ext.replace('.', '');
  const filetype2 = filetree2.ext.replace('.', '');
  const before = parse(filetype1, fs.readFileSync(filepath1, 'utf-8'));
  const after = parse(filetype2, fs.readFileSync(filepath2, 'utf-8'));
  const ast = buildAst(before, after);
  return render(ast, format);
};
