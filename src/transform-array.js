const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  const resultArray = [];
  const length = arr.length;

  for (let i = 0; i < length; i++) {
    const currentElement = arr[i];

    if (currentElement === '--discard-next') {
      if (i < length - 1) {
        i++;
      }
    } else if (currentElement === '--discard-prev') {
      if (resultArray.length > 0) {
        resultArray.pop();
      }
    } else if (currentElement === '--double-next') {
      if (i < length - 1) {
        resultArray.push(arr[i + 1]);
      }
    } else if (currentElement === '--double-prev') {
      if (resultArray.length > 0) {
        resultArray.push(resultArray[resultArray.length - 1]);
      }
    } else {
      resultArray.push(currentElement);
    }
  }

  return resultArray;
}

module.exports = {
  transform,
};
