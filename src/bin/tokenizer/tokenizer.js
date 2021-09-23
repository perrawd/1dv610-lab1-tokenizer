import Token from './token.js'

/**
 * @class Tokenizer
 */
export default class Tokenizer {
  /**
   * Creates an instance of Tokenizer.
   *
   * @param {object} type The Grammatic type.
   * @param {string} string The string to be tokenized.
   */
  constructor (type, string) {
    this._trim = type.trim
    this._seperator = type.seperator
    this._grammarTypes = type.grammarTypes

    this._string = string

    this._lexicalGrammar = []
    this._processNextToken()

    this._activeTokenIndex = 0
    this._activeToken = this._lexicalGrammar[this._activeTokenIndex]
  }

  /**
   * Process next token to be appended to the Lexical Grammar.
   *
   */
  _processNextToken () {
    try {
      this._isEmpty(this._string)
        ? this._appendEndTokenToLexicalGrammar()
        : this._appendNextTokenToLexicalGrammar()
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
   * Append a END token to the Lexical Grammar.
   *
   */
  _appendEndTokenToLexicalGrammar () {
    const endToken = this._createNewTokenWith(
      this._lexicalGrammar.length,
      'END',
      'END'
    )
    this._appendToLexicalGrammar(endToken)
  }

  /**
   * Creates a new token.
   *
   * @param {number} index Index of the token in the Lexical Grammar.
   * @param {string} tokenType The token type.
   * @param {string} value Value of the token.
   * @returns {object} The token.
   */
  _createNewTokenWith (index, tokenType, value) {
    return new Token(index, tokenType, value)
  }

  /**
   * Append a token to the Lexical Grammar.
   *
   * @param {object} token The token.
   */
  _appendToLexicalGrammar (token) {
    this._lexicalGrammar.push(token)
  }

  /**
   * Append the next token to the Lexical Grammar.
   *
   */
  _appendNextTokenToLexicalGrammar () {
    const token = this._tokenizeNextSubString()
    this._appendToLexicalGrammar(token)
  }

  /**
   * Tokenizes the next substring in a string.
   *
   * @returns {object} The token.
   */
  _tokenizeNextSubString () {
    if (this._trim) this._trimString()
    const subString = this._getNextSubStringFrom(this._string)
    this._cutFromString(subString)
    const matches = this._getGrammarMatchesFor(subString)
    const maximumMunch = this._getMaximumMunchFrom(matches)
    const token = this._createNewTokenWith(
      this._lexicalGrammar.length,
      maximumMunch.tokenType,
      maximumMunch.value
    )
    return token
  }

  /**
   * Trims the string.
   *
   */
  _trimString () {
    this._string = this._string.trim()
  }

  /**
   * Slices the first substring from the string.
   *
   * @param {string} string The string to slice.
   * @returns {string} The substring sliced from string.
   */
  _getNextSubStringFrom (string) {
    return string.slice(0, this._string.search(this._seperator) + 1)
  }

  /**
   * Cut the first matching substring from the string.
   *
   * @param {string} subString The substring.
   */
  _cutFromString (subString) {
    this._string = this._string.replace(subString, '')
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
      if (!matches.length) { throw new Error('No matches found for this subtoken!') }
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
    for (const [tokenType, pattern] of Object.entries(this._grammarTypes)) {
      if (this._patternMatch(pattern, subString)) {
        matches.push(this._createNewTokenWith(0, tokenType, subString.match(pattern)[0]))
      }
    }
    return matches
  }

  /**
   * Matches pattern to substring and returns boolean value.
   *
   * @param {string} pattern A Regexp pattern.
   * @param {string} subString The substring.
   * @returns {boolean} If a match is true.
   */
  _patternMatch (pattern, subString) {
    return new RegExp(pattern).test(subString)
  }

  /**
   * Get the maximum munch from an array of matches.
   *
   * @param {Array} matches Array of matches.
   * @returns {object} The Maximum Munch.
   */
  _getMaximumMunchFrom (matches) {
    return matches.sort((a, b) => b.value.length - a.value.length)[0]
  }

  /**
   * Set active token to previous.
   *
   */
  setActiveTokenToPrevious () {
    try {
      if (this._isFirstToken()) { throw new Error('First index reached') }
      this._updateActiveTokenIndexToPrevious()
      this._updateActiveToken()
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
   *
   */
  _updateActiveTokenIndexToPrevious () {
    this._activeTokenIndex -= 1
  }

  /**
   * Tokenize the next substring.
   *
   */
  setActiveTokenToNext () {
    try {
      if (this._isEndToken()) { throw new Error('Last TOKEN reached') }
      this._processNextToken()
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
   */
  _isEndToken () {
    return this._lexicalGrammar[this._lexicalGrammar.length - 1].tokenType === 'END'
  }

  /**
   * Set the activeTokenIndex to next.
   *
   */
  _updateActiveTokenIndexToNext () {
    this._activeTokenIndex += 1
  }

  /**
   * Update the active token to the current active token index.
   *
   */
  _updateActiveToken () {
    this._activeToken = this._lexicalGrammar[this._activeTokenIndex]
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
}
