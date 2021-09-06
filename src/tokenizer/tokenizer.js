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

    this.lexicalGrammar = this.tokenize()

    this.currentIndex = 0
    this.currentToken = this.lexicalGrammar[this.currentIndex]
  }

  /**
   * Tokenizes a string.
   *
   * @returns {Array} An Array of objects for the tokenized string.
   */
  tokenize () {
    try {
      if (!this.string.length) {
        throw new Error('Empty string provided. Please provide a valid string.')
      }

      let regex
      const tokenizedString = []

      switch (this.type) {
        case 'WordAndDotGrammar':
          regex = /([.\s])/
          break
        case 'ArithmeticGrammar':
          regex = /(?<=[-+*/])|(?=[-+*/])/
          break
        default:
          throw new Error('Missing valid lexical grammatic type.')
      }

      // TODO: If possible, fix/finalize regex in order to remove filter.
      const splittedString = this.string
        .split(regex)
        .filter(token => token !== '' && token !== ' ')

      splittedString.forEach((subString, index) => {
        const tokenType = this._determineTokenType(this.type, subString)

        tokenizedString.push({
          tokenMatch: index,
          tokenType: tokenType,
          value: subString
        })
      })

      return tokenizedString
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
  moveTo (direction) {
    try {
      switch (direction) {
        case 'previous':
          if ((this.currentIndex - 1) < 0) {
            throw new Error('First index reached')
          }
          this.currentIndex -= 1
          this.currentToken = this.lexicalGrammar[this.currentIndex]
          break
        case 'next':
          if ((this.currentIndex + 1) > (this.lexicalGrammar.length - 1)) {
            throw new Error('Last index reached')
          }
          this.currentIndex += 1
          this.currentToken = this.lexicalGrammar[this.currentIndex]
          break
        default:
          throw new Error('Invalid direction')
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  /**
   * Determines the token-type of a string.
   *
   * @param {string} type The sub-string to determine type for.
   * @param {string} subString The sub-string to determine type for.
   * @returns {string} Type of the sub-string.
   */
  _determineTokenType (type, subString) {
    try {
      let tokenType

      // TODO: Look into refactoring this.
      switch (type) {
        case 'WordAndDotGrammar':
          if (subString === '.') {
            tokenType = 'DOT'
          } else if (subString.length > 0) {
            tokenType = 'WORD'
          }
          break
        case 'ArithmeticGrammar':
          switch (subString) {
            case '+':
              tokenType = 'ADD'
              break
            case '-':
              tokenType = 'SUB'
              break
            default:
              tokenType = 'NUMBER'
          }
          break
      }

      return tokenType
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Prints a table of the tokenized string.
   *
   * @param {object} input The tokenized string.
   */
  printTable (input) {

  }
}
