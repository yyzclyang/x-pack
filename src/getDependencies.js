const path = require('path');

function getDependencies(filePath, fileContent) {
  const reg = /require\(['"](.+?)['"]/g;
  let result = null;
  const dependencies = [];
  while ((result = reg.exec(fileContent))) {
    const requireContent = result[1];
    const dependencyFilePath = path.resolve(
      path.dirname(filePath),
      requireContent
    );
    const dependencyFileRelativePath = path.relative(
      process.cwd(),
      dependencyFilePath
    );

    // require 值的文件目录是相对于源文件的路径，读取模块时需要一个相对于项目目录的路径
    // 此时无法得到依赖文件在模块数组中的序列号
    // 暂时存储依赖文件的相对路径，然后根据文件资源的 key 来转换（key 在 createAsset 中生成）
    dependencies.push([requireContent, dependencyFileRelativePath]);
  }
  return dependencies;
}

module.exports = { getDependencies };
