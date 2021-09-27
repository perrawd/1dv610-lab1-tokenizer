/**
 * Module for Grammar.
 *
 * @author Per Rawdin <per.rawdin@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Enum for Grammar.
 *
 * @readonly
 * @enum {string}
 */
const GRAMMAR_NAME = Object.freeze({
  WORD_AND_DOT: 'WordAndDotGrammar',
  ARITHMETIC: 'ArithmeticGrammar',
  MAXIMAL_MUNCH: 'MaximalMunchGrammar'
})

export default GRAMMAR_NAME
