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
   * @param {*} type The Grammatic type.
   * @param {*} string The string to be tokenized.
   * @memberof Tokenizer
   */
  constructor (type, string) {
    // Assigns key value pairs of the Grammar type to the object.
    Object.assign(this, type)
    this.string = string

    this.lexicalGrammar = []
    this.tokenizeSubString()

    this.activeTokenIndex = 0
    this.activeToken = this.lexicalGrammar[this.activeTokenIndex]
  }

  /**
   * Move active token to previous.
   *
   * @memberof Tokenizer
   */
  getPreviousToken () {
    try {
      if ((this.activeTokenIndex - 1) < 0) {
        throw new Error('First index reached')
      }
      this.activeTokenIndex -= 1
      this.activeToken = this.lexicalGrammar[this.activeTokenIndex]
    } catch (error) {
      console.error(error)
    }
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
        this.tokenizeSubString()
      }
      this.activeTokenIndex++
      this.activeToken = this.lexicalGrammar[this.activeTokenIndex]
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Tokenizes a substring.
   *
   * @memberof Tokenizer
   */
  tokenizeSubString () {
    this.string = this.string.trimStart()
    const subString = this.string.slice(0, this.string.search(this.splitPattern) + 1)
    this.string = this.string.replace(subString, '')
    const munches = this._matchGrammarTypesTo(subString)
    const token = this._getMaximumMunch(munches)
    this._addToLexicalGrammar(token)
  }

  /**
   * Matches grammar types a substring.
   *
   * @param {string} subString string.
   * @memberof Tokenizer
   * @returns {Array} Array.
   */
  _matchGrammarTypesTo (subString) {
    const munches = []
    for (const [key, value] of Object.entries(this.grammarTypes)) {
      const index = 1
      if (new RegExp(value).test(subString)) {
        const { token } = new TokenizedSubString(
          index,
          key,
          subString.match(value)[0]
        )
        munches.push(token)
      }
    }
    return munches
  }

  /**
   * Gets maximum munch from an array of munches.
   *
   * @param {Array} munches munches.
   * @memberof Tokenizer
   * @returns {object} Array.
   */
  _getMaximumMunch (munches) {
    console.log(munches)
    const result = munches.sort((a, b) => b.value.length - a.value.length)
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
