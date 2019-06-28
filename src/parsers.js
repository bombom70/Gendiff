import yaml from 'js-yaml';
import fs from 'fs';

const mapping = {
    '.json': f => JSON.parse(fs.readFileSync(f)),
    '.yaml': f => yaml.safeLoad(fs.readFileSync(f))
}


export default (format, pathToFile) => {
    return mapping[format](pathToFile);
};