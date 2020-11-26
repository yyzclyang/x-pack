const fs = require('fs');
const path = require('path');

function createBundle(codeGraphs) {
  const modulesGraphs = `[${codeGraphs.map(codeAsset => {
    return `{
      key: ${JSON.stringify(codeAsset.key)},
      dependencies: ${JSON.stringify(
        codeAsset.dependencies.reduce(
          (result, [requireContent, dependencyFileRelativePath]) => {
            return {
              ...result,
              [requireContent]: codeGraphs.findIndex(
                codeAsset => codeAsset.key === dependencyFileRelativePath
              )
            };
          },
          {}
        )
      )},
      code: ${codeAsset.code}
    }`;
  })}]`;

  const bundleContent = `
  (function (modulesGraphs) {
    const modules = {};
    function exec(index) {
      // 处理循环依赖
      if(modules[index]) {
        return modules[index];
      }
      const { dependencies, code } = modulesGraphs[index];
      const module = { exports: {} };
      modules[index] = module.exports;

      function require(path) {
        // 根据模块路径，返回模块执行的结果
        return exec(dependencies[path]);
      }

      code && code(require, module.exports, module);

      return module.exports;
    }
  
    exec(0);
  })(${modulesGraphs});
  `;

  const bundlePath = path.resolve(process.cwd(), './dist/bundle.js');
  fs.mkdirSync(path.dirname(bundlePath), { recursive: true });
  fs.writeFileSync(bundlePath, bundleContent);
}

module.exports = { createBundle };
