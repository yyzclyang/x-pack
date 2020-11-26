const bModule = require('./b.js');

const value = 'a';
const message = () => `a.js get ${bModule.bValue} from b.js`;

exports.aValue = value;
exports.aMessage = message;
