const { createGraph } = require('./createGraph');
const { createBundle } = require('./createbundle');

createBundle(createGraph('./example/index.js'));
