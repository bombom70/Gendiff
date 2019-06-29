import diff from '../src';
import path from 'path';

test('diff JSON file', () => {

  const f1 = path.resolve(__dirname, '__fixtures__/before.json');
  const f2 = path.resolve(__dirname, '__fixtures__/after.json');

  expect(diff(f1, f2)).toBe(`{\n\t  host: hexlet.io\n\t+ timeout: 20\n\t- timeout: 50\n\t- proxy: 123.234.53.22\n\t- follow: false\n\t+ verbose: true\n}`); 
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