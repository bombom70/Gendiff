import plainRender from './plainRender';
import jsonRender from './jsonRender';
import treeRender from './treeRender';

export default (ast, format) => {
  switch (format) {
    case 'plain':
      return plainRender(ast);
    case 'json':
      return jsonRender(ast);
    default:
      return treeRender(ast);
  }
};
