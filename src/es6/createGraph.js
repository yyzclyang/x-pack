const path = require('path');
const { createAsset } = require('./createAsset');

function createGraph(filePath) {
  const asset = createAsset(filePath);
  const queue = [asset];

  for (const asset of queue) {
    const dirname = path.dirname(asset.filepath);
    asset.mapping = {};
    asset.dependencies.forEach(filename => {
      const absolutePath = path.resolve(dirname, filename);
      const dependenceAsset = createAsset(absolutePath);
      asset.mapping[filename] = dependenceAsset.id;
      queue.push(dependenceAsset);
    });
  }

  return queue;
}

module.exports = { createGraph };
