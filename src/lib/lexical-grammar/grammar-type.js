/**
 * Module for Grammar.
 *
 * @module src/tokenizer/grammar
 * @author Per Rawdin <per.rawdin@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Enum for Grammar.
 *
 * @readonly
 * @enum {string}
 */
const GRAMMAR_TYPE = Object.freeze({
  WORD_AND_DOT: 'WordAndDotGrammar',
  ARITHMETIC: 'ArithmeticGrammar',
  MAXIMAL_MUNCH: 'MaximalMunchGrammar'
})

export default GRAMMAR_TYPE
