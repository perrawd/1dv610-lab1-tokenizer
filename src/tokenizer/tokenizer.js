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
    Object.assign(this, type)
    this.string = string
  }

  /**
   * Tokenizes a string.
   *
   * @returns {Array} array
   * @memberof Tokenizer
   */
  tokenize () {
    try {
      if (!this.string.length) {
        throw new Error('Empty string provided. Please provide a valid string.')
      }

      const splittedString = this.string
        .split(new RegExp(this.splitPattern))
        .filter(token => token !== '' && token !== ' ')

      const tokenizedString = []

      splittedString.forEach((subString, index) => {
        for (const property in this.grammarTypes) {
          if (new RegExp(this.grammarTypes[property]).test(subString)) {
            const { token } = new TokenizedSubString(
              index,
              property,
              subString
            )
            tokenizedString.push(token)
            break
          }
        }
      })

      return [
        ...tokenizedString,
        new TokenizedSubString(splittedString.length, 'END', '').token
      ]
    } catch (error) {
      console.error(error)
    }
  }
}
