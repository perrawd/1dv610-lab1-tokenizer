/**
 * Creates a tokenized substring.
 *
 * @class TokenizedSubString
 */
export default class TokenizedSubString {
  /**
   * Constructor.
   *
   * @param {string} tokenMatch The index of token.
   * @param {string} tokenType The tokenType.
   * @param {string} value The subString.
   */
  constructor (tokenMatch, tokenType, value) {
    this.token = {
      tokenMatch,
      tokenType,
      value
    }
  }
}
