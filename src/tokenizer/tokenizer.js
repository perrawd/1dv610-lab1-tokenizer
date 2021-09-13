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
   * Tokenizes a substring.
   *
   * @memberof Tokenizer
   */
  tokenizeSubString () {
    this.string.trimStart()
    const subString = this.string.slice(0, this.string.search(this.splitPattern))
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
          subString
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
    const result = munches.sort((a, b) => a.value.length - b.value.length)
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
