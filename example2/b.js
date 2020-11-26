const aModule = require('./a.js');

const value = 'b';
const message = () => `b.js get ${aModule.aValue} from a.js`;

exports.bValue = value;
exports.bMessage = message;
