const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 *
 */
const chainMaker = {
  result: [],
  getLength() {
    return this.result.length;
  },
  addLink(value) {
    if (value === undefined) {
      value = '';
    }
    this.result.push('( ' + value + ' )');
    return this;
  },
  removeLink(position) {
    if (
      typeof position === 'number' &&
      position > 0 &&
      position < this.result.length
    ) {
      this.result.splice(position - 1, 1);
    } else {
      this.result = [];
      throw new Error("You can't remove incorrect link!");
    }
    return this;
  },
  reverseChain() {
    this.result.reverse();
    return this;
  },
  finishChain() {
    return this.result.join('~~');
  },
};

module.exports = {
  chainMaker,
};
