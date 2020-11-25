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

    dependencies.push([requireContent, dependencyFileRelativePath]);
  }
  return dependencies;
}

module.exports = { getDependencies };
