import fs from 'fs';
import ini from 'ini';
import yaml from 'js-yaml';

const reeadFile = filepath => fs.readFileSync(filepath, 'utf-8');

const mapping = {
  '.json': filepath => JSON.parse(reeadFile(filepath)),
  '.yaml': filepath => yaml.safeLoad(reeadFile(filepath)),
  '.ini': filepath => ini.parse(reeadFile(filepath)),
};

export default (format, filepath) => mapping[format](filepath);
