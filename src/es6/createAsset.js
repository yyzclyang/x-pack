const fs = require('fs');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const babel = require('babel-core');

let ID = 0;
function createAsset(filepath) {
  const fileContent = fs.readFileSync(filepath, 'utf-8');

  // 将读取到的文件转成抽象语法树
  const ast = babylon.parse(fileContent, { sourceType: 'module' });

  const dependencies = [];

  // 处理抽象语法树
  traverse(ast, {
    // 只针对导入依赖
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value);
    }
  });

  // 转义抽象语法树
  const { code } = babel.transformFromAst(ast, null, {
    presets: ['env']
  });

  const id = ID++;

  return {
    id,
    filepath: filepath,
    dependencies,
    code: `function (require, exports, module) { ${code} }`
  };
}

module.exports = { createAsset };
