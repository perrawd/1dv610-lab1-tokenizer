import LongestMatch from './longest-match.js'
import GrammarMatches from './grammar-matches.js'
import Token from './token.js'

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
    this._grammarMatches = new GrammarMatches(this._tokenTypes)
    const matches = this._grammarMatches._getGrammarMatchesFor(subString)
    const maximumMunch = new LongestMatch(matches)
    const longestMatch = maximumMunch.getLongestMatch()
    const token = this._createNewTokenWith(
      this._index,
      longestMatch.tokenType,
      longestMatch.value
    )
    this._index += 1
    return token
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