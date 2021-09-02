/**
 * Creates a tokenizer.
 *
 * @class Tokenizer
 */
export default class Tokenizer {
  /**
   * Constructor.
   *
   * @param {string} type The type of tokenization.
   * @param {string} string The string to be tokenized.
   */
  constructor (type, string) {
    this.type = type
    this.string = string
  }

  /**
   * Tokenizes a string.
   *
   * @returns {Array} An Array of objects for the tokenized string.
   */
  tokenize () {
    let regex
    const tokenizedString = []

    switch (this.type) {
      case 'WordAndDotGrammar':
        regex = /([.\s])/
    }

    // TODO: If possible, fix/finalize regex in order to remove filter.
    const splittedString = this.string
      .split(regex)
      .filter(w => w !== '' && w !== ' ')

    splittedString.forEach((subString, index) => {
      const tokenType = this._determineTokenType(subString)

      tokenizedString.push({
        tokenMatch: index,
        tokenType: tokenType,
        value: subString
      })
    })

    return tokenizedString
  }

  /**
   * Determines the token-type of a string.
   *
   * @param {any} subString The sub-string to determine type for.
   * @returns {string} Type of the sub-string.
   */
  _determineTokenType (subString) {
    let tokenType

    if (subString === '.') {
      tokenType = 'DOT'
    } else if (subString.length > 0) {
      tokenType = 'WORD'
    }

    return tokenType
  }

  /**
   * Prints a table of the tokenized string.
   *
   * @param {object} input The tokenized string.
   */
  printTable (input) {

  }
}
