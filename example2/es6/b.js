import aModule from './a.js';

const value = 'b';
const message = () => `b.js get ${aModule.aValue} from a.js`;
const module = { bValue: value, bMessage: message };

export default module;
