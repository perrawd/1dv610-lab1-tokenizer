import fs from 'fs'

export default class LexicalGrammar {
  /**
   * Assign all attributes from grammar file to the object.
   */
  constructor (GRAMMAR_NAME) {
    Object.assign(this,
      JSON.parse(fs.readFileSync(new URL(`./types/${GRAMMAR_NAME}.json`, import.meta.url), 'utf8')
      )
    )
  }
}
