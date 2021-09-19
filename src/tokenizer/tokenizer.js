import TokenizedSubString from './tokenizedSubString.js'
/**
 *
 *
 * @class Tokenizer
 */
export default class Tokenizer {
  /**
   * Creates an instance of Tokenizer.
   *
   * @param {object} type The Grammatic type.
   * @param {string} string The string to be tokenized.
   * @memberof Tokenizer
   */
  constructor (type, string) {
    // Assigns key value pairs of the Grammar type to the object.
    Object.assign(this, type)
    this._string = string

    this._lexicalGrammar = []
    this._processNextSubString()

    this._activeTokenIndex = 0
    this._activeToken = this._lexicalGrammar[this._activeTokenIndex]
  }

  /**
   * Tokenizes a substring.
   *
   * @memberof Tokenizer
   */
  _processNextSubString () {
    try {
      this._isEmpty(this._string)
        ? this._createAndAppendEndTokenToLexicalGrammar()
        : this._tokenizeSubStringAndAppendToLexicalGrammar()
    } catch (error) {
      this._processError(error)
    }
  }

  /**
   * Validates if remaining string is empty.
   *
   * @param {*} string the string.
   * @returns {boolean} returns if true.
   * @memberof Tokenizer
   */
  _isEmpty (string) {
    return !string.trim().length
  }

  /**
   * Adds a END token to the Lexical Grammar.
   *
   * @memberof Tokenizer
   */
  _createAndAppendEndTokenToLexicalGrammar () {
    const endToken = this._createNewTokenWith(
      this._lexicalGrammar.length,
      'END',
      'END'
    )
    this._appendToLexicalGrammar(endToken)
  }

  /**
   * Creates new token.
   *
   * @param {number} index The index.
   * @param {string} tokenType The Token Type.
   * @param {string} value The value.
   * @returns {object} The tokenized substring.
   * @memberof Tokenizer
   */
  _createNewTokenWith (index, tokenType, value) {
    return new TokenizedSubString(index, tokenType, value).token
  }

  /**
   * Tokenizes a substring.
   *
   * @memberof Tokenizer
   */
  _tokenizeSubStringAndAppendToLexicalGrammar () {
    this._trimString()
    const subString = this._getSubStringFrom(this._string)
    this._cutFromString(subString)
    const matches = this._getGrammarMatchesFor(subString)
    const maximumMunch = this._getMaximumMunchFrom(matches)
    const token = this._createNewTokenWith(
      this._lexicalGrammar.length,
      maximumMunch.tokenType,
      maximumMunch.value
    )
    this._appendToLexicalGrammar(token)
  }

  /**
   * Trim a string.
   *
   * @memberof Tokenizer
   */
  _trimString () {
    this._string = this._string.trimStart()
  }

  /**
   * Slices a substring from a string.
   *
   * @param {string} string the string to slice.
   * @returns {string} the sliced substring.
   * @memberof Tokenizer
   */
  _getSubStringFrom (string) {
    return string.slice(0, this._string.search(this.splitPattern) + 1)
  }

  /**
   * Cuts from the substring from string.
   *
   * @param {string} subString the substring.
   * @memberof Tokenizer
   */
  _cutFromString (subString) {
    this._string = this._string.replace(subString, '')
  }

  /**
   * Matches grammar types a substring.
   *
   * @param {string} subString string.
   * @memberof Tokenizer
   * @returns {Array} Array.
   */
  _getGrammarMatchesFor (subString) {
    try {
      const matches = this._matchTokenTypesTo(subString)
      if (!matches.length) { throw new Error('No matches found for this subtoken!') }
      return matches
    } catch (error) {
      this._processError(error)
    }
  }

  /**
   * Returns an array of found munches.
   *
   * @param {string} subString The SubString.
   * @returns {Array} Array of munches.
   * @memberof Tokenizer
   */
  _matchTokenTypesTo (subString) {
    const matches = []
    for (const [tokenType, pattern] of Object.entries(this.grammarTypes)) {
      if (this._patternMatch(pattern, subString)) {
        matches.push(this._createNewTokenWith(0, tokenType, subString.match(pattern)[0]))
      }
    }
    return matches
  }

  /**
   * Matches pattern to substring and returns boolean value.
   *
   * @param {string} pattern THe Regexp pattern.
   * @param {string} subString The SubString.
   * @returns {boolean} boolean.
   * @memberof Tokenizer
   */
  _patternMatch (pattern, subString) {
    return new RegExp(pattern).test(subString)
  }

  /**
   * Gets maximum munch from an array of munches.
   *
   * @param {Array} munches munches.
   * @memberof Tokenizer
   * @returns {object} Array.
   */
  _getMaximumMunchFrom (munches) {
    return munches.sort((a, b) => b.value.length - a.value.length)[0]
  }

  /**
   * Adds token to the lexical grammar array.
   *
   * @param {object} token token.
   * @memberof Tokenizer
   */
  _appendToLexicalGrammar (token) {
    this._lexicalGrammar.push(token)
  }

  /**
   * Move active token to previous.
   *
   * @memberof Tokenizer
   */
  setPreviousToken () {
    try {
      if (this._isFirstToken()) { throw new Error('First index reached') }
      this._updateActiveTokenIndexToPrevious()
      this._updateActiveToken()
    } catch (error) {
      this._processError(error)
    }
  }

  /**
   * Set the activeTokenIndex to previous.
   *
   * @memberof Tokenizer
   */
  _updateActiveTokenIndexToPrevious () {
    this._activeTokenIndex -= 1
  }

  /**
   * Validates if current token is first token.
   *
   * @returns {boolean} boolean.
   * @memberof Tokenizer
   */
  _isFirstToken () {
    return this._activeTokenIndex === 0
  }

  /**
   * Tokenize the next substring.
   *
   * @memberof Tokenizer
   */
  setNextToken () {
    try {
      if (this._isEndToken()) { throw new Error('Last TOKEN reached') }
      this._processNextSubString()
      this._updateActiveTokenIndexToNext()
      this._updateActiveToken()
    } catch (error) {
      this._processError(error)
    }
  }

  /**
   * Validates if current token is END.
   *
   * @returns {boolean} boolean.
   * @memberof Tokenizer
   */
  _isEndToken () {
    return this._lexicalGrammar[this._lexicalGrammar.length - 1].tokenType === 'END'
  }

  /**
   * Set the activeTokenIndex to next.
   *
   * @memberof Tokenizer
   */
  _updateActiveTokenIndexToNext () {
    this._activeTokenIndex += 1
  }

  /**
   * Sets the active token to index passed in.
   *
   * @memberof Tokenizer
   */
  _updateActiveToken () {
    this._activeToken = this._lexicalGrammar[this._activeTokenIndex]
  }

  /**
   * Process error handling.
   *
   * @param {*} error The Error object.
   * @memberof Tokenizer
   */
  _processError (error) {
    console.error(`Error: ${error.message}`)
    process.exitCode = 1
  }

  /**
   * Returns the active token.
   *
   * @returns {object} The active token.
   * @memberof Tokenizer
   */
  getActiveToken () {
    return this._activeToken
  }
}
