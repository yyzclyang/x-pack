const modulesGraphs = [
  {
    key: 'example/index.js',
    dependencies: { './message.js': 1 },
    code: function (require, exports, module) {
      const message = require('./message.js').message;

      console.log(message);
    }
  },
  {
    key: 'example/message.js',
    dependencies: { './name.js': 2, './action.js': 3 },
    code: function (require, exports, module) {
      const name = require('./name.js').name;
      const action = require('./action.js').action;

      const message = `${name} is ${action}`;

      exports.message = message;
    }
  },
  {
    key: 'example/name.js',
    dependencies: {},
    code: function (require, exports, module) {
      const name = 'yyzcl';

      exports.name = name;
    }
  },
  {
    key: 'example/action.js',
    dependencies: {},
    code: function (require, exports, module) {
      const action = 'practice';

      exports.action = action;
    }
  }
];

(function (modulesGraphs) {
  const modules = {};
  function exec(index) {
    if (modules[index]) {
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
})(modulesGraphs);
