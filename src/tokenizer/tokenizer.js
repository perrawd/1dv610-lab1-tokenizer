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

    this.lexicalGrammar = this.tokenize()

    this.activeTokenIndex = 0
    this.activeToken = this.lexicalGrammar[this.activeTokenIndex]
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

  /**
   * Move current to next.
   *
   * @param {string} direction The direction to move the pointer of the current token to.
   *
   */
  moveActiveTokenTo (direction) {
    try {
      switch (direction) {
        case 'previous':
          if ((this.activeTokenIndex - 1) < 0) {
            throw new Error('First index reached')
          }
          this.activeTokenIndex -= 1
          break
        case 'next':
          if ((this.activeTokenIndex + 1) > (this.lexicalGrammar.length - 1)) {
            throw new Error('Last index reached')
          }
          this.activeTokenIndex += 1
          break
        default:
          throw new Error('Invalid direction')
      }
      this.activeToken = this.lexicalGrammar[this.activeTokenIndex]
    } catch (error) {
      console.error(error.message)
    }
  }
}
