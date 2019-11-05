import fs from 'fs';
import ini from 'ini';
import yaml from 'js-yaml';

const reeadFile = pathToFile => fs.readFileSync(pathToFile, 'utf-8');

const mapping = {
  '.json': f => JSON.parse(reeadFile(f)),
  '.yaml': f => yaml.safeLoad(reeadFile(f)),
  '.ini': f => ini.parse(reeadFile(f)),
};

export default (format, pathToFile) => mapping[format](pathToFile);
