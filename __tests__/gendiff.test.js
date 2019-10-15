import fs from 'fs';
import path from 'path';
import diff from '../src';

test('diff JSON file', () => {
  const f1 = fs.readFileSync(path.resolve(__dirname, '__fixtures__/before.json'));
  const f2 = fs.readFileSync(path.resolve(__dirname, '__fixtures__/after.json'));
  const result = fs.readFileSync(`${__dirname}/__fixtures__/resultJSON.txt`, 'utf-8');
  const expected = diff(f1, f2);
  console.log(fs.readFileSync(f1, 'utf-8'));
  console.log(f2);
  console.log(typeof result === 'string');
  console.log(typeof expected === 'string');

  expect(diff(f1, f2)).toBe(result);
});

test('diff yaml file', () => {
  const f1 = path.resolve(__dirname, '__fixtures__/before.yaml');
  const f2 = path.resolve(__dirname, '__fixtures__/after.yaml');
  expect(diff(f1, f2)).toBe(`{\n\t  host: hexlet.io\n\t+ timeout: 20\n\t- timeout: 50\n\t- proxy: 123.234.53.22\n\t- follow: false\n\t+ verbose: true\n}`); 
});

test('diff ini file', () => {

  const f1 = path.resolve(__dirname, '__fixtures__/before.ini');
  const f2 = path.resolve(__dirname, '__fixtures__/after.ini');

  expect(diff(f1, f2)).toBe(`{\n\t  host: hexlet.io\n\t+ timeout: 20\n\t- timeout: 50\n\t- proxy: 123.234.53.22\n\t- follow: false\n\t+ verbose: true\n}`); 
});