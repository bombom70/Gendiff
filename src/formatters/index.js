import plainFormat from './plainFormat';
import jsonFormat from './jsonFormat';
import treeParse from './treeFormat';

export default (ast, format) => {
  switch (format) {
    case 'plain':
      return plainFormat(ast);
    case 'json':
      return jsonFormat(ast);
    default:
      return treeParse(ast);
  }
};
