import bModule from './b.js';

const value = 'a';
const message = () => `a.js get ${bModule.bValue} from b.js`;
const module = { aValue: value, aMessage: message };

export default module;
