import fs from 'fs';
import path from 'path';
import genDiff from '../src';

test('diff JSON', () => {
  const valueBefore = path.resolve(__dirname, '__fixtures__/before.json');
  const valueAfter = path.resolve(__dirname, '__fixtures__/after.json');
  const expected = fs.readFileSync(`${__dirname}/__fixtures__/resultJSON.txt`, 'utf-8');
  const result = genDiff(valueBefore, valueAfter);
  expect(result).toBe(expected);
});

test('diff yaml', () => {
  const valueBefore = path.resolve(__dirname, '__fixtures__/before.yaml');
  const valueAfter = path.resolve(__dirname, '__fixtures__/after.yaml');
  const expected = fs.readFileSync(`${__dirname}/__fixtures__/resultJSON.txt`, 'utf-8');
  const result = genDiff(valueBefore, valueAfter);
  expect(result).toBe(expected);
});

test('diff ini', () => {
  const valueBefore = path.resolve(__dirname, '__fixtures__/before.ini');
  const valueAfter = path.resolve(__dirname, '__fixtures__/after.ini');
  const expected = fs.readFileSync(`${__dirname}/__fixtures__/resultJSON.txt`, 'utf-8');
  const result = genDiff(valueBefore, valueAfter);
  expect(result).toBe(expected);
});

test('diff plain format', () => {
  const valueBefore = path.resolve(__dirname, '__fixtures__/before.json');
  const valueAfter = path.resolve(__dirname, '__fixtures__/after.json');
  const expected = fs.readFileSync(`${__dirname}/__fixtures__/plainFormatResult.txt`, 'utf-8');
  const format = 'plain';
  const result = genDiff(valueBefore, valueAfter, format);
  expect(result).toBe(expected);
});
