import fs from 'fs';
import diff from '../src';
import parser from '../src/parser';

test('diff JSON', () => {
  const before = parser(fs.readFileSync(`${__dirname}/__fixtures__/before2.json`, 'utf-8'));
  const after = parser(fs.readFileSync(`${__dirname}/__fixtures__/after2.json`, 'utf-8'));
  const expected = fs.readFileSync(`${__dirname}/__fixtures__/resultJSON.txt`, 'utf-8');
  const result = diff(before, after);

  expect(result).toBe(expected);
});
