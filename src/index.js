const { createGraph } = require('./createGraph');
const { createBundle } = require('./createbundle');

const args = process.argv;

if (args.length < 3) {
  return;
}

createBundle(createGraph(args[2]));
