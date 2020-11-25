const path = require('path');
const { createAsset } = require('./createAsset');

function createGraph(filePath) {
  const asset = createAsset(filePath);
  const codeGraphs = [asset];

  for (const codeAsset of codeGraphs) {
    codeAsset.dependencies.forEach(([, dependencyFileRelativePath]) => {
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
