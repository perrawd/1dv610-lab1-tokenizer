import Token from './lib/token/token.js'

export default class TokenMatch {
  constructor (lexicalGrammar, string) {
    this._tokenTypes = lexicalGrammar.tokenTypes
    this._delimiter = lexicalGrammar.delimiter
    this._trim = lexicalGrammar.trim

    this._string = string
    this._tokenList = []
    this._index = 0
  }

  getTokenMatch (subString) {
    const matches = this._getGrammarMatchesFor(subString)
    const longestMatch = this._getlongestMatchFrom(matches)
    const token = this._createNewTokenWith(
      this._index,
      longestMatch.tokenType,
      longestMatch.value
    )
    this._index += 1
    return token
  }


  /**
   * Matches grammar types to a substring.
   *
   * @param {string} subString string.
   * @returns {Array} Array.
   */
   _getGrammarMatchesFor (subString) {
    try {
      const matches = this._matchTokenTypesTo(subString)
      if (!matches.length) { throw new Error('No matches found for this substring.') }
      return matches
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
    const matches = []
    for (const [tokenType, pattern] of Object.entries(this._tokenTypes)) {
      if (this._patternMatch(pattern, subString)) {
        matches.push(this._createNewTokenWith(0, tokenType, subString.match(pattern)[0]))
      }
    }
    return matches
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
   * Get the longest match from an array of matches.
   *
   * @param {Array} matches Array of matches.
   * @returns {object} The longest match (Maximum munch).
   */
  _getlongestMatchFrom (matches) {
    return matches.sort((a, b) => b.value.length - a.value.length)[0]
  }

  /**
   * Set active token to previous.
   */
  setActiveTokenToPrevious () {
    try {
      if (this._isFirstToken()) { throw new Error('First token has been reached.') }
      this._updateActiveTokenIndexToPrevious()
      this._setActiveToken()
    } catch (error) {
      this._processError(error)
    }
  }

  /**
   * Validate if current token is first token.
   *
   * @returns {boolean} Returns true if current token is the first.
   */
  _isFirstToken () {
    return this._activeTokenIndex === 0
  }

  /**
   * Process error handling.
   *
   * @param {object} error The Error object.
   */
   _processError (error) {
    console.error(`Error: ${error.message}`)
    process.exitCode = 1
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