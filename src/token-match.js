import Token from './token.js'
import LongestMatch from './longest-match.js'

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

  
    const maximumMunch = new LongestMatch(subString, this._tokenTypes)
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

  getEndToken () {
    return this._createNewTokenWith(
      this._index,
      'END',
      'END'
    )
  }
}