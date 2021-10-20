import Token from './token.js'
import TokenMatch from './token-match.js'

export default class TokenList extends Array {
  constructor (lexicalGrammar, string) {
    super()
    this._delimiter = lexicalGrammar.delimiter
    this._trim = lexicalGrammar.trim
    /*
    this._tokenTypes = lexicalGrammar.tokenTypes
    */
    this._string = string

    this._tokenMatch = new TokenMatch(lexicalGrammar, string)


    this._processNextToken()
  }
  /**
   * Process next token to be appended to the token list.
   *
   */
   _processNextToken () {
    try {
      this._isEmpty(this._string)
        ? this._appendEndTokenToTokenList()
        : this._appendNextTokenToTokenList()
    } catch (error) {
      this._processError(error)
    }
  }

  /**
   * Validate if remaining string is empty.
   *
   * @param {string} string The string.
   * @returns {boolean} Returns true if the string is empty.
   */
  _isEmpty (string) {
    return !string.trim().length
  }

  /**
   * Append a END token to the token list.
   *
   */
  _appendEndTokenToTokenList () {
    const endToken = this._createNewTokenWith(
      this.length,
      'END',
      'END'
    )
    this._appendToTokenList(endToken)
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

  /**
   * Append a token to the token list.
   *
   * @param {object} token The token.
   */
  _appendToTokenList (token) {
    this.push(token)
  }

  /**
   * Append the next tokenized substring to the token list.
   *
   */
  _appendNextTokenToTokenList () {
    const token = this._processAndTokenizeNextSubString()
    this._appendToTokenList(token)
  }

  /**
   * Tokenizes the next substring.
   *
   * @returns {object} The token.
   */
  _processAndTokenizeNextSubString () {
    if (this._trim) this._trimString()
    const subString = this._getNextSubStringFrom(this._string)
    this._cutFromString(subString)
    const tokenMatch = this._tokenMatch.getTokenMatch(subString)
    return tokenMatch
  }

  /**
   * Trim the string.
   */
  _trimString () {
    this._string = this._string.trim()
  }

  /**
   * Returns the first substring from the string.
   *
   * @param {string} string The string to slice from.
   * @returns {string} The substring sliced from string.
   */
  _getNextSubStringFrom (string) {
    return string.slice(0, this._string.search(this._delimiter) + 1)
  }

  /**
   * Cut the processed substring from the string.
   *
   * @param {string} subString The substring.
   */
  _cutFromString (subString) {
    this._string = this._string.replace(subString, '')
  }
}