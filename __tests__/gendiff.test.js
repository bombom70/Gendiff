import diff from '../src';
import fs from 'fs';
import path from 'path';
import { getDate } from '../src/index';

test('diff', () => {

  const f1 = path.resolve(__dirname, '__fixtures__/before.json');
  const f2 = path.resolve(__dirname, '__fixtures__/after.json');

  expect(diff(f1, f2)).toBe(`{\n\t  host: hexlet.io\n\t+ timeout: 20\n\t- timeout: 50\n\t- proxy: 123.234.53.22\n\t- follow: false\n\t+ verbose: true\n}`); 
});