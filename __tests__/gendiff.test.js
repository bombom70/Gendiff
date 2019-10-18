import fs from 'fs';
import path from 'path';
import diff from '../src';

<<<<<<< HEAD
test('diff JSON', () => {
  const beforeObject = path.resolve(__dirname, '__fixtures__/before.json');
  const afterObject = path.resolve(__dirname, '__fixtures__/after.json');
  const expected = fs.readFileSync(`${__dirname}/__fixtures__/resultJSON.txt`, 'utf-8');
  const result = diff(beforeObject, afterObject);
  expect(result).toBe(expected);
});

test('diff yaml', () => {
  const beforeObject = path.resolve(__dirname, '__fixtures__/before.yaml');
  const afterObject = path.resolve(__dirname, '__fixtures__/after.yaml');
  const expected = fs.readFileSync(`${__dirname}/__fixtures__/resultJSON.txt`, 'utf-8');
  const result = diff(beforeObject, afterObject);
  expect(result).toBe(expected);
=======
test('diff JSON file', () => {
  const f1 = fs.readFileSync(`${__dirname}/__fixtures__/before.json`, 'utf-8');
  const f2 = fs.readFileSync(`${__dirname}/__fixtures__/after.json`, 'utf-8');
  const result = fs.readFileSync(`${__dirname}/__fixtures__/resultJSON.txt`, 'utf-8');
  console.log(JSON.stringify(f1) instanceof Object);
  const expected = diff(JSON.stringify(f1), JSON.stringify(f2));
  expect(diff(f1, f2)).toBe(result);
});

test('diff yaml file', () => {
  const f1 = path.resolve(__dirname, '__fixtures__/before.yaml');
  const f2 = path.resolve(__dirname, '__fixtures__/after.yaml');
  expect(diff(f1, f2)).toBe(`{\n\t  host: hexlet.io\n\t+ timeout: 20\n\t- timeout: 50\n\t- proxy: 123.234.53.22\n\t- follow: false\n\t+ verbose: true\n}`); 
>>>>>>> master
});

test('diff ini', () => {
  const beforeObject = path.resolve(__dirname, '__fixtures__/before.ini');
  const afterObject = path.resolve(__dirname, '__fixtures__/after.ini');
  const expected = fs.readFileSync(`${__dirname}/__fixtures__/resultJSON.txt`, 'utf-8');
  const result = diff(beforeObject, afterObject);
  expect(result).toBe(expected);
});
