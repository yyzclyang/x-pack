const { createGraph } = require('./createGraph');
const { createBundle } = require('./createbundle');

createBundle(createGraph('./example/es6/index.js'));
