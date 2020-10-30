const fs = require('fs');
const { getDependencies } = require('./getDependencies');

let ID = 0;
function createAsset(filepath) {
  const fileContent = fs.readFileSync(filepath, 'utf-8');
  const id = ID++;
  return {
    id,
    filepath: filepath,
    dependencies: getDependencies(fileContent),
    code: `function (require, exports, module) {
      ${fileContent}
    }`
  };
}

module.exports = { createAsset };
