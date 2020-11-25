const fs = require('fs');
const path = require('path');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const babel = require('babel-core');

function createAsset(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const fileRelativePath = path.relative(process.cwd(), filePath);
  const dependencies = [];
  // 将读取到的文件转成抽象语法树
  const ast = babylon.parse(fileContent, { sourceType: 'module' });

  // 处理抽象语法树
  traverse(ast, {
    // 只针对导入依赖
    ImportDeclaration: ({ node }) => {
      const importPath = node.source.value;
      const dependencyFilePath = path.resolve(
        path.dirname(filePath),
        importPath
      );
      const dependencyFileRelativePath = path.relative(
        process.cwd(),
        dependencyFilePath
      );

      dependencies.push([importPath, dependencyFileRelativePath]);
    }
  });

  // 转义抽象语法树
  const { code } = babel.transformFromAst(ast, null, {
    presets: ['env']
  });

  return {
    key: fileRelativePath,
    dependencies: dependencies,
    code: `function (require, exports, module) {
      ${code}
    }`
  };
}

module.exports = { createAsset };
