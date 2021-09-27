/**
 * Module for LexicalGrammar.
 *
 * @author Per Rawdin <per.rawdin@student.lnu.se>
 * @version 1.0.0
 */
import fs from 'fs'

/**
 * @class LexicalGrammar
 *
 */
export default class LexicalGrammar {
  /**
   * Creates an instance of LexicalGrammar.
   *
   * @param {string} GRAMMAR_NAME The JSON string for grammar type.
   */
  constructor (GRAMMAR_NAME) {
    Object.assign(this,
      JSON.parse(fs.readFileSync(new URL(`./types/${GRAMMAR_NAME}.json`, import.meta.url), 'utf8')
      )
    )
  }
}
