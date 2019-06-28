import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const mapping = {
    '.json': f => JSON.parse(fs.readFileSync(f)),
    '.yml': f => yaml.safeLoad(fs.readFileSync(f))
}


export default (format) => {
    return path.extname(format) === '.json' ? mapping['.json'](format) : mapping['.yaml'](format) ;
};