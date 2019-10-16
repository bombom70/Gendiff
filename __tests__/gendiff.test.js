import fs from 'fs';
import { render, parse } from '../src';

test('diff JSON', () => {
  const before = JSON.parse(fs.readFileSync(`${__dirname}/__fixtures__/before2.json`, 'utf-8'));
  const after = JSON.parse(fs.readFileSync(`${__dirname}/__fixtures__/after2.json`, 'utf-8'));
  const expected = fs.readFileSync(`${__dirname}/__fixtures__/resultJSON.txt`, 'utf-8');
  const result = parse(render(before, after));

  expect(result).toBe(expected);
});
