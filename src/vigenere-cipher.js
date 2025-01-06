const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(direction = true) {
    this.direction = direction;
    this.letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  encrypt(message, key) {
    this.validateInputs(message, key);
    return this.processMessage(message, key, true);
  }

  decrypt(message, key) {
    this.validateInputs(message, key);
    return this.processMessage(message, key, false);
  }

  validateInputs(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }
  }

  processMessage(message, key, isEncrypt) {
    const keyCrypt = this.getCryptKey(message, key);
    const processedMessage = message
      .toUpperCase()
      .split('')
      .map((char, i) => {
        const charIndex = this.letters.indexOf(char);
        if (charIndex === -1) return char;

        const keyIndex = this.letters.indexOf(keyCrypt[i]);
        const newIndex = isEncrypt
          ? (charIndex + keyIndex) % 26
          : (charIndex - keyIndex + 26) % 26;

        return this.letters[newIndex];
      })
      .join('');

    return this.direction
      ? processedMessage
      : processedMessage.split('').reverse().join('');
  }

  getCryptKey(message, key) {
    const messageUpper = message.toUpperCase();
    const repeatedKey = key
      .repeat(Math.ceil(messageUpper.length / key.length))
      .toUpperCase();

    let keyIndex = 0;
    return messageUpper
      .split('')
      .map((char) => {
        if (this.letters.includes(char)) {
          return repeatedKey[keyIndex++];
        }
        return char;
      })
      .join('');
  }
}

module.exports = {
  VigenereCipheringMachine,
};
