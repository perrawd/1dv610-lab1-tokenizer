import fs from 'fs'

/**
 *
 *
 * @class GrammaticType
 */
export default class GrammaticType {
  /**
   * Creates an instance of GrammaticType.
   *
   * @param {string} jsonFile The JSON string for grammar type.
   * @memberof GrammaticType
   */
  constructor (jsonFile) {
    Object.assign(this, JSON.parse(fs.readFileSync(`./${jsonFile}.json`, 'utf8')))
  }
}
