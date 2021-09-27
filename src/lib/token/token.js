/**
 * Module for Token.
 *
 * @author Per Rawdin <per.rawdin@student.lnu.se>
 * @version 1.0.0
 */

/**
 * @class Token
 */
export default class Token {
  /**
   * Creates an instance of Token.
   *
   * @param {string} tokenMatch The index of token.
   * @param {string} tokenType The token type.
   * @param {string} value The substring.
   */
  constructor (tokenMatch, tokenType, value) {
    this.tokenMatch = tokenMatch
    this.tokenType = tokenType
    this.value = value
  }
}
