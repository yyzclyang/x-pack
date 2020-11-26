const path = require('path');
const { createAsset } = require('./createAsset');

function createGraph(filePath) {
  const asset = createAsset(filePath);
  const codeGraphs = [asset];

  for (const codeAsset of codeGraphs) {
    codeAsset.dependencies.forEach(([, dependencyFileRelativePath]) => {
      // 如果已处理的文件 asset 中有某一项的 key 等于当前模块依赖的相对路径，说明之前处理过
      if (
        codeGraphs.find(
          codeAsset => codeAsset.key === dependencyFileRelativePath
        )
      ) {
        return;
      }

      const dependencyFileAbsolutePath = path.resolve(
        process.cwd(),
        dependencyFileRelativePath
      );
      const dependenceAsset = createAsset(dependencyFileAbsolutePath);
      codeGraphs.push(dependenceAsset);
    });
  }

  return codeGraphs;
}

module.exports = { createGraph };
