const fs = require('fs');
const path = require('path');

function createBundle(graphs) {
  const modulesContent = `{
    ${graphs
      .map(mod => {
        return `${mod.id}: [${mod.code}, ${JSON.stringify(mod.mapping)}]`;
      })
      .join(',')}
  }`;

  const bundleContent = `
  (function (modules) {
    function exec(id) {
      const [fn, dependencies] = modules[id];
      const module = { exports: {} };
      function require(path) {
        // 根据模块路径，返回模块执行的结果
        return exec(dependencies[path]);
      }
  
      fn && fn(require, module.exports, module);
  
      return module.exports;
    }
  
    exec(0);
  })(${modulesContent});
  `;

  const bundlePath = path.resolve(__dirname, '../dist/bundle.js');
  fs.mkdirSync(path.dirname(bundlePath), { recursive: true });
  fs.writeFileSync(bundlePath, bundleContent);
}

module.exports = { createBundle };
