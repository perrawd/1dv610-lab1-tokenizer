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
    this.string = string

    this.lexicalGrammar = []
    this._tokenizeString()

    this.activeTokenIndex = 0
    this.activeToken = this.lexicalGrammar[this.activeTokenIndex]
  }

  /**
   * Tokenizes a substring.
   *
   * @memberof Tokenizer
   */
  _tokenizeString () {
    try {
      this._isEmpty(this.string)
        ? this._addEndToken()
        : this._tokenizeSubString()
    } catch (error) {
      this._processError(error)
    }
  }

  /**
   * Validates if remaining string is empty.
   *
   * @param {*} str the string.
   * @returns {boolean} returns if true.
   * @memberof Tokenizer
   */
  _isEmpty (str) {
    return !str.trim().length
  }

  /**
   * Adds a END token to the Lexical Grammar.
   *
   * @memberof Tokenizer
   */
  _addEndToken () {
    const endToken = this._createNewTokenWith(
      this.lexicalGrammar.length,
      'END',
      'END'
    )
    this._addToLexicalGrammar(endToken)
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
  _tokenizeSubString () {
    this._trimString()
    const subString = this._getSubStringFrom(this.string)
    this._cutFromString(subString)
    const munches = this._matchGrammarTypesTo(subString)
    const token = this._getMaximumMunch(munches)
    this._addToLexicalGrammar(token)
  }

  /**
   * Trim a string.
   *
   * @memberof Tokenizer
   */
  _trimString () {
    this.string = this.string.trimStart()
  }

  /**
   * Slices a substring from a string.
   *
   * @param {string} string the string to slice.
   * @returns {string} the sliced substring.
   * @memberof Tokenizer
   */
  _getSubStringFrom (string) {
    return string.slice(0, this.string.search(this.splitPattern) + 1)
  }

  /**
   * Cuts from the substring from string.
   *
   * @param {string} subString the substring.
   * @memberof Tokenizer
   */
  _cutFromString (subString) {
    this.string = this.string.replace(subString, '')
  }

  /**
   * Move active token to previous.
   *
   * @memberof Tokenizer
   */
  getPreviousToken () {
    try {
      if (this.isFirstToken()) { throw new Error('First index reached') }
      this._setPreviousTokenIndex() // kapsla i en funktion som bara returnerar this.activeIndex-1, skicka det till nästa
      this._setActiveToken()
    } catch (error) {
      this._processError(error)
    }
  }

  /**
   * Set the activeTokenIndex to previous.
   *
   * @memberof Tokenizer
   */
  _setPreviousTokenIndex () {
    this.activeTokenIndex -= 1
  }

  /**
   * Validates if current token is first token.
   *
   * @returns {boolean} boolean.
   * @memberof Tokenizer
   */
  isFirstToken () {
    return this.activeTokenIndex === 0
  }

  /**
   * Tokenize the next substring.
   *
   * @memberof Tokenizer
   */
  getNextToken () {
    try {
      if (this._isEndToken()) { throw new Error('Last TOKEN reached') }
      this._tokenizeString()
      this._setNextTokenIndex()
      this._setActiveToken()
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
    return this.lexicalGrammar[this.lexicalGrammar.length - 1].tokenType === 'END'
  }

  /**
   * Set the activeTokenIndex to next.
   *
   * @memberof Tokenizer
   */
  _setNextTokenIndex () {
    this.activeTokenIndex += 1
  }

  /**
   * Sets the active token to index passed in.
   *
   * @memberof Tokenizer
   */
  _setActiveToken () {
    this.activeToken = this.lexicalGrammar[this.activeTokenIndex]
  }

  /**
   * Matches grammar types a substring.
   *
   * @param {string} subString string.
   * @memberof Tokenizer
   * @returns {Array} Array.
   */
  _matchGrammarTypesTo (subString) {
    try {
      const munches = this._findMunchesForSubString(subString)
      if (!munches.length) { throw new Error('No matches found for this subtoken!') }
      return munches
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
  _findMunchesForSubString (subString) {
    const munches = []
    for (const [tokenType, pattern] of Object.entries(this.grammarTypes)) {
      if (this._patternsMatches(pattern, subString)) {
        munches.push(this._createNewTokenWith(0, tokenType, subString.match(pattern)[0]))
      }
    }
    return munches
  }

  /**
   * Matches pattern to substring and returns boolean value.
   *
   * @param {string} pattern THe Regexp pattern.
   * @param {string} subString The SubString.
   * @returns {boolean} boolean.
   * @memberof Tokenizer
   */
  _patternsMatches (pattern, subString) {
    return new RegExp(pattern).test(subString)
  }

  /**
   * Gets maximum munch from an array of munches.
   *
   * @param {Array} munches munches.
   * @memberof Tokenizer
   * @returns {object} Array.
   */
  _getMaximumMunch (munches) {
    return munches.sort((a, b) => b.value.length - a.value.length)[0]
  }

  /**
   * Adds token to the lexical grammar array.
   *
   * @param {object} subString token.
   * @memberof Tokenizer
   */
  _addToLexicalGrammar (subString) {
    const token = this._createNewTokenWith(
      this.lexicalGrammar.length,
      subString.tokenType,
      subString.value
    )
    this.lexicalGrammar.push(token)
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
}
