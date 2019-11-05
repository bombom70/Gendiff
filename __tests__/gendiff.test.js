import fs from 'fs';
import path from 'path';
import genDiff from '../src';

test.each`
  extName      | format            | file
  ${'json'}    | ${'plain'}'       | ${'plainFormatResult.txt'}
  ${'json'}    | ${'json'}'        | ${'resultJSON.txt'}
  ${'json'}    | ${'jsonTree'}'    | ${'resultTree.txt'}
  ${'yaml'}    | ${'plain'}'       | ${'plainFormatResult.txt'}
  ${'yaml'}    | ${'json'}'        | ${'resultJSON.txt'}
  ${'yaml'}    | ${'jsonTree'}'    | ${'resultTree.txt'}
  ${'ini'}     | ${'plain'}'       | ${'plainFormatResult.txt'}
  ${'ini'}     | ${'json'}'        | ${'resultJSON.txt'}
  ${'ini'}     | ${'jsonTree'}'    | ${'resultTree.txt'}
`('test $extName with format $format', ({ extName, format, file }) => {
  const valueBefore = path.resolve(__dirname, `__fixtures__/before.${extName}`);
  const valueAfter = path.resolve(__dirname, `__fixtures__/after.${extName}`);
  const expectedValue = fs.readFileSync(`${__dirname}/__fixtures__/${file}`, 'utf-8');
  const result = genDiff(valueBefore, valueAfter, format);
  console.log(result);

  expect(result).toBe(expectedValue);
});
