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
      console.error(`Error: ${error.message}`)
      process.exitCode = 1
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
   * Tokenizes a substring.
   *
   * @memberof Tokenizer
   */
  _tokenizeSubString () {
    this._trimString()
    const subString = this._getSubStringFrom(this.string)
    this._cutSubStringFromString(subString)
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
  _cutSubStringFromString (subString) {
    this.string = this.string.replace(subString, '')
  }

  /**
   * Move active token to previous.
   *
   * @memberof Tokenizer
   */
  getPreviousToken () {
    try {
      if (this.isFirstToken()) {
        throw new Error('First index reached')
      }
      this.activeTokenIndex -= 1 // kapsla i en funktion som bara returnerar this.activeIndex-1, skicka det till nästa
      this._setActiveTokenTo(this.activeTokenIndex) // Kapsla i en funktion, kan återanvändas i både next och prev
    } catch (error) { // kapsla in hela error hanteringen i en egen funktion, använd för alla
      console.error(`Error: ${error.message}`)
      process.exitCode = 1
    }
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
      if (this.lexicalGrammar[this.lexicalGrammar.length - 1].tokenType === 'END') {
        throw new Error('Last TOKEN')
      }
      if (!this.string.length) {
        const endToken = {
          index: this.lexicalGrammar.length,
          tokenType: 'END',
          value: 'END'
        }
        this._addToLexicalGrammar(endToken)
      } else {
        this._tokenizeString()
      }
      this.activeTokenIndex += 1
      this._setActiveTokenTo(this.activeTokenIndex)
    } catch (error) {
      console.error(`Error: ${error.message}`)
      process.exitCode = 1
    }
  }

  /**
   * Sets the active token to index passed in.
   *
   * @param {number} index The index to set the active token to.
   * @memberof Tokenizer
   */
  _setActiveTokenTo (index) {
    this.activeToken = this.lexicalGrammar[index]
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
      const munches = []
      for (const [key, value] of Object.entries(this.grammarTypes)) {
        const index = 1
        if (new RegExp(value).test(subString)) {
          const { token } = new TokenizedSubString(
            index,
            key,
            subString.match(value)[0]
          )
          munches.push(token) // addToMunchesArray
        }
      }
      if (!munches.length) {
        throw new Error('No matches found for this subtoken!')
      }
      return munches
    } catch (error) {
      console.error(`Error: ${error.message}`)
      process.exitCode = 1
    }
  }

  /**
   * Gets maximum munch from an array of munches.
   *
   * @param {Array} munches munches.
   * @memberof Tokenizer
   * @returns {object} Array.
   */
  _getMaximumMunch (munches) {
    // console.log(munches)
    const result = munches.sort((a, b) => b.value.length - a.value.length) // sortMunchesByLength()
    return result[0]
  }

  /**
   * Adds token to the lexical grammar array.
   *
   * @param {object} subString token.
   * @memberof Tokenizer
   */
  _addToLexicalGrammar (subString) {
    const { token } = new TokenizedSubString(
      this.lexicalGrammar.length,
      subString.tokenType,
      subString.value
    )
    this.lexicalGrammar.push(token)
  }
}
