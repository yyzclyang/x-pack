const modules = {
  0: [
    function (require, exports, module) {
      const message = require('./message').message;

      console.log(message);
    },
    { './message': 3 }
  ],
  1: [
    function (require, exports, module) {
      const name = 'yyzcl';

      exports.name = name;
    },
    {}
  ],
  2: [
    function (require, exports, module) {
      const action = 'practice';

      exports.action = action;
    },
    {}
  ],
  3: [
    function (require, exports, module) {
      const name = require('./name').name;
      const action = require('./action').action;

      const message = `${name} is ${action}`;

      exports.message = message;
    },
    { './name': 1, './action': 2 }
  ]
};

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
})(modules);
