/**
 * Module for LexicalAnalysis.
 *
 * @author Per Rawdin <per.rawdin@student.lnu.se>
 * @version 1.0.0
 */
import Token from './lib/token/token.js'
import TokenMatch from './token-match.js'

/**
 * @class Tokenizer
 */
export default class LexicalAnalysis {
  /**
   * Creates an instance of LexicalAnalysis.
   *
   * @param {object} lexicalGrammar The lexical grammar.
   * @param {string} string The string to be tokenized.
   */
  constructor (lexicalGrammar, string) {
    this._delimiter = lexicalGrammar.delimiter
    this._trim = lexicalGrammar.trim
    /*
    this._tokenTypes = lexicalGrammar.tokenTypes
    
    
*/
    this._string = string

    this._tokenMatch = new TokenMatch(lexicalGrammar, string)

    this._tokenList = []
    this._processNextToken()

    this._activeTokenIndex = 0
    this._activeToken = this._tokenList[this._activeTokenIndex]
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
      this._tokenList.length,
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
    this._tokenList.push(token)
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
    /*
    const matches = this._getGrammarMatchesFor(subString)
    const longestMatch = this._getlongestMatchFrom(matches)
    const token = this._createNewTokenWith(
      this._tokenList.length,
      longestMatch.tokenType,
      longestMatch.value
    )
    return token
    */
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
   * Set the activeTokenIndex to previous.
   */
  _updateActiveTokenIndexToPrevious () {
    this._activeTokenIndex -= 1
  }

  /**
   * Update the active token to the current active token index.
   *
   */
  _setActiveToken () {
    this._activeToken = this._tokenList[this._activeTokenIndex]
  }

  /**
   * Tokenize the next substring.
   */
  setActiveTokenToNext () {
    try {
      if (this._isEndToken()) { throw new Error('Last token has been reached.') }
      this._processNextToken()
      this._updateActiveTokenIndexToNext()
      this._setActiveToken()
    } catch (error) {
      this._processError(error)
    }
  }

  /**
   * Validates if current token is END.
   *
   * @returns {boolean} boolean.
   */
  _isEndToken () {
    return this._tokenList[this._tokenList.length - 1].tokenType === 'END'
  }

  /**
   * Set the activeTokenIndex to next.
   *
   */
  _updateActiveTokenIndexToNext () {
    this._activeTokenIndex += 1
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
   * Returns the active token.
   *
   * @returns {object} The active token.
   */
  getActiveToken () {
    return this._activeToken
  }

  /**
   * Returns the token list.
   *
   * @returns {Array} The token list.
   */
  getTokenList () {
    return this._tokenList
  }
}
