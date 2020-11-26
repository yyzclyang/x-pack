const fs = require('fs');
const path = require('path');
const { getDependencies } = require('./getDependencies');

function createAsset(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const fileRelativePath = path.relative(process.cwd(), filePath);

  return {
    // 以文件的相对项目目录的相对路径做 key，便于计算依赖在模块数组中的下标
    key: fileRelativePath,
    dependencies: getDependencies(filePath, fileContent),
    code: `function (require, exports, module) {
      ${fileContent}
    }`
  };
}

module.exports = { createAsset };
