const fs = require('fs');
const path = require('path');
const { getDependencies } = require('./getDependencies');

function createAsset(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const fileRelativePath = path.relative(process.cwd(), filePath);

  return {
    key: fileRelativePath,
    dependencies: getDependencies(filePath, fileContent),
    code: `function (require, exports, module) {
      ${fileContent}
    }`
  };
}

module.exports = { createAsset };
