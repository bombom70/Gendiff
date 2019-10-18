import fs from 'fs';
import ini from 'ini';
import yaml from 'js-yaml';

const mapping = {
  '.json': f => JSON.parse(fs.readFileSync(f, 'utf-8')),
  '.yaml': f => yaml.safeLoad(fs.readFileSync(f, 'utf-8')),
  '.ini': f => ini.parse(fs.readFileSync(f, 'utf-8')),
};

export default (format, pathToFile) => mapping[format](pathToFile);
