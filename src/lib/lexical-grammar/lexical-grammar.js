import fs from 'fs'

/**
 * @class LexicalGrammar
 *
 */
export default class LexicalGrammar {
  /**
   * Creates an instance of LexicalGrammar.
   *
   * @param {string} GRAMMAR_TYPE The JSON string for grammar type.
   */
  constructor (GRAMMAR_TYPE) {
    Object.assign(this,
      JSON.parse(fs.readFileSync(new URL(`./types/${GRAMMAR_TYPE}.json`,
        import.meta.url),
      'utf8')
      )
    )
  }
}
