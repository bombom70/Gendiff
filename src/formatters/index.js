import plainFormat from './plainFormat';
import jsonFormat from './jsonFormat';
import treeParse from './treeFormat';

export default (ast, format) => {
  if (format === 'plain') {
    return plainFormat(ast);
  }
  if (format === 'json') {
    return jsonFormat(ast);
  }
  return treeParse(ast);
};
