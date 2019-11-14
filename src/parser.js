import ini from 'ini';
import yaml from 'js-yaml';

const mapping = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

export default (type, data) => mapping[type](data);
