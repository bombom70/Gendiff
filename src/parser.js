import fs from 'fs';
import ini from 'ini';
import yaml from 'js-yaml';

const convertFileToObject = file => fs.readFileSync(file, 'utf-8');
const mapping = {
  '.json': f => JSON.parse(convertFileToObject(f)),
  '.yaml': f => yaml.safeLoad(convertFileToObject(f)),
  '.ini': f => ini.parse(convertFileToObject(f)),
};

export default (format, pathToFile) => mapping[format](pathToFile);
