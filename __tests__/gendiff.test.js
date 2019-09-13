import diff from '../src';
import path, { parse } from 'path';
import fs from 'fs';
import genDiff from '../src/';
import parser from '../src/parser';

test('diff JSON', () => {
  const before = parser(path.resolve(__dirname, '__fixtures__/before2.json'));
  const after = parser(path.resolve(__dirname, '__fixtures__/after2.json'));
  const reveived = genDiff(before, after);

  console.log(before);

  const expected = `{
    common: {
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
        setting6: {
            key: value
          + ops: vops
        }
      + follow: false
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`;

  expect(diff(reveived)).toBe(expected); 
});

// test('diff yaml file', () => {

//   const f1 = path.resolve(__dirname, '__fixtures__/before.yaml');
//   const f2 = path.resolve(__dirname, '__fixtures__/after.yaml');

//   const reveived = buildAst(f1, f2);

//   const expected = `{
//   host: hexlet.io
// + timeout: 20
// - timeout: 50
// - proxy: 123.234.53.22
// - follow: false
// + verbose: true
// }`;

//   expect(diff(reveived)).toBe(expected);
// });

// test('diff ini file', () => {

//   const expected = `{
//   host: hexlet.io
// + timeout: 20
// - timeout: 50
// - proxy: 123.234.53.22
// - follow: false
// + verbose: true
// }`;

//   const f1 = path.resolve(__dirname, '__fixtures__/before.ini');
//   const f2 = path.resolve(__dirname, '__fixtures__/after.ini');

//   const reveived = buildAst(f1, f2);

//   expect(diff(reveived)).toBe(expected); 
// });