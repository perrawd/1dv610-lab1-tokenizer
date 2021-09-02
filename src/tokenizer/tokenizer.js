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
}
