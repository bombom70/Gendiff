import fs from 'fs';
import path from 'path';
import genDiff from '../src';

test.each`
  fileFormat      | formatOutput      | fileName
  ${'json'}       | ${'plain'}'       | ${'plainFormatResult.txt'}
  ${'json'}       | ${'json'}'        | ${'resultJSON.txt'}
  ${'json'}       | ${'tree'}'        | ${'resultTree.txt'}
  ${'yaml'}       | ${'plain'}'       | ${'plainFormatResult.txt'}
  ${'yaml'}       | ${'json'}'        | ${'resultJSON.txt'}
  ${'yaml'}       | ${'tree'}'        | ${'resultTree.txt'}
  ${'ini'}        | ${'plain'}'       | ${'plainFormatResult.txt'}
  ${'ini'}        | ${'json'}'        | ${'resultJSON.txt'}
  ${'ini'}        | ${'tree'}'        | ${'resultTree.txt'}
`('test $fileFormat file with $formatOutput format', ({ fileFormat, formatOutput, fileName }) => {
  const valueBefore = path.resolve(__dirname, `__fixtures__/before.${fileFormat}`);
  const valueAfter = path.resolve(__dirname, `__fixtures__/after.${fileFormat}`);
  const expectedValue = fs.readFileSync(`${__dirname}/__fixtures__/${fileName}`, 'utf-8');
  const result = genDiff(valueBefore, valueAfter, formatOutput);
  expect(result).toBe(expectedValue);
});
