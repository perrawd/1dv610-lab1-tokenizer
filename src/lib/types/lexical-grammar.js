import fs from 'fs'

/**
 * @class LexicalGrammar
 *
 */
export default class LexicalGrammar {
  /**
   * Creates an instance of LexicalGrammar.
   *
   * @param {string} jsonFile The JSON string for grammar type.
   */
  constructor (jsonFile) {
    Object.assign(this,
      JSON.parse(fs.readFileSync(new URL(`./${jsonFile}.json`,
        import.meta.url),
      'utf8')
      )
    )
  }
}
