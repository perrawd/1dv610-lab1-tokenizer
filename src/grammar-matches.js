import Token from './token.js'

export default class GrammarMatches extends Array {
  constructor (tokenTypes) {
    super()
    this._matches = []
    this._tokenTypes = tokenTypes
  }

  /**
 * Matches grammar types to a substring.
 *
 * @param {string} subString string.
 * @returns {Array} Array.
 */
   _getGrammarMatchesFor (subString) {
    try {
      this._matchTokenTypesTo(subString)
      if (!this._matches.length) { throw new Error('No matches found for this substring.') }
      return this._matches
    } catch (error) {
      this._processError(error)
    }
  }

  /**
   * Returns an array of grammar matches for a substring.
   *
   * @param {string} subString The substring.
   * @returns {Array} Array of matches.
   */
   _matchTokenTypesTo (subString) {
    for (const [tokenType, pattern] of Object.entries(this._tokenTypes)) {
      if (this._patternMatch(pattern, subString)) {
        this._matches.push(this._createNewTokenWith(0, tokenType, subString.match(pattern)[0]))
      }
    }
  }

  /**
   * Matches grammar pattern to substring.
   *
   * @param {string} pattern A Regexp pattern.
   * @param {string} subString The substring.
   * @returns {boolean} If a match is true.
   */
   _patternMatch (pattern, subString) {
    return new RegExp(pattern).test(subString)
  }

  /**
   * Create a new token.
   *
   * @param {number} index Index of the token.
   * @param {string} tokenType The token type.
   * @param {string} value Value of the token.
   * @returns {object} The token.
   */
   _createNewTokenWith (index, tokenType, value) {
    return new Token(index, tokenType, value)
  }
}

