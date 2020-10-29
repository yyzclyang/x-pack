const name = require('./name.js').name;
const action = require('./action.js').action;

const message = `${name} is ${action}`;

exports.message = message;
