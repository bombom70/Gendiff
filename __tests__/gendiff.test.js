import fs from 'fs';
import path from 'path';
import genDiff from '../src';

test('diff JSON', () => {
  const beforeObject = path.resolve(__dirname, '__fixtures__/before.json');
  const afterObject = path.resolve(__dirname, '__fixtures__/after.json');
  const expected = fs.readFileSync(`${__dirname}/__fixtures__/resultJSON.txt`, 'utf-8');
  const result = genDiff(beforeObject, afterObject);
  expect(result).toBe(expected);
});

test('diff yaml', () => {
  const beforeObject = path.resolve(__dirname, '__fixtures__/before.yaml');
  const afterObject = path.resolve(__dirname, '__fixtures__/after.yaml');
  const expected = fs.readFileSync(`${__dirname}/__fixtures__/resultJSON.txt`, 'utf-8');
  const result = genDiff(beforeObject, afterObject);
  expect(result).toBe(expected);
});

test('diff ini', () => {
  const beforeObject = path.resolve(__dirname, '__fixtures__/before.ini');
  const afterObject = path.resolve(__dirname, '__fixtures__/after.ini');
  const expected = fs.readFileSync(`${__dirname}/__fixtures__/resultJSON.txt`, 'utf-8');
  const result = genDiff(beforeObject, afterObject);
  expect(result).toBe(expected);
});

test('diff plain format', () => {
  const beforeObject = path.resolve(__dirname, '__fixtures__/before.json');
  const afterObject = path.resolve(__dirname, '__fixtures__/after.json');
  const expected = fs.readFileSync(`${__dirname}/__fixtures__/plainFormatResult.txt`, 'utf-8');
  const format = 'plain';
  const result = genDiff(beforeObject, afterObject, format);
  expect(result).toBe(expected);
});
