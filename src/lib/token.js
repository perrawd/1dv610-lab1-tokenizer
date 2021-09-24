/**
 * Creates a tokenized substring.
 *
 * @class Token
 */
export default class Token {
  /**
   * Constructor.
   *
   * @param {string} tokenMatch The index of token.
   * @param {string} tokenType The tokenType.
   * @param {string} value The subString.
   */
  constructor (tokenMatch, tokenType, value) {
    this.tokenMatch = tokenMatch
    this.tokenType = tokenType
    this.value = value
  }
}
