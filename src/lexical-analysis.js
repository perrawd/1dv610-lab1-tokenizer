/**
 * Module for LexicalAnalysis.
 *
 * @author Per Rawdin <per.rawdin@student.lnu.se>
 * @version 1.0.0
 */

import TokenList from './token-list.js'

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

    this._tokenList = new TokenList(lexicalGrammar, string)
    this._activeTokenIndex = 0
    this._activeToken = this._tokenList[this._activeTokenIndex]
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
      this._tokenList._processNextToken()
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
