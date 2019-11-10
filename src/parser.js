import ini from 'ini';
import yaml from 'js-yaml';

const mapping = {
  '.json': filepath => JSON.parse(filepath),
  '.yaml': filepath => yaml.safeLoad(filepath),
  '.ini': filepath => ini.parse(filepath),
};

export default (format, filepath) => mapping[format](filepath);
