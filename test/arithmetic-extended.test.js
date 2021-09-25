import { expect } from '@jest/globals'
import LexicalGrammar from '../src/lib/lexical-grammar.js'
import GRAMMAR_TYPE from '../src/lib/grammar-type.js'
import Tokenizer from '../src/tokenizer.js'

const { ARITHMETIC } = GRAMMAR_TYPE

const arithmeticGrammar = new LexicalGrammar(ARITHMETIC)

/**
 * Operates and calls each sequence.
 *
 * @param {object} grammar The grammar.
 * @param {string} sequence The sequence.
 */
const sequenceOperator = (grammar, sequence) => {
  try {
    const sequences = sequence.split('')
    for (const sequence of sequences) {
      switch (sequence) {
        case '>':
          grammar.setActiveTokenToNext()
          break
        case '<':
          grammar.setActiveTokenToPrevious()
          break
        default:
          throw new Error('Invalid sequence')
      }
    }
  } catch (error) {
    console.error(error)
  }
}

test('TC.17 SUB', () => {
  const TC17 = new Tokenizer(arithmeticGrammar, '60   - (18)')
  sequenceOperator(TC17, '>><><')
  expect(TC17.getActiveToken()).toEqual({
    tokenMatch: 1,
    tokenType: 'SUB',
    value: '-'
  })
})

test('TC.18 DIV', () => {
  const TC18 = new Tokenizer(arithmeticGrammar, '160 /  4.0 + 2')
  sequenceOperator(TC18, '>>><>><<<')
  expect(TC18.getActiveToken()).toEqual({
    tokenMatch: 1,
    tokenType: 'DIV',
    value: '/'
  })
})

test('TC.19 OPEN PARENTHESIS', () => {
  const TC19 = new Tokenizer(arithmeticGrammar, '(58 + 8) - (8  * 3)')
  sequenceOperator(TC19, '>>><>>><>>')
  expect(TC19.getActiveToken()).toEqual({
    tokenMatch: 6,
    tokenType: 'OPENPAREN',
    value: '('
  })
})

test('TC.19 OPEN PARENTHESIS', () => {
  const TC20 = new Tokenizer(arithmeticGrammar, '(89.5 + 45.5) / 3')
  sequenceOperator(TC20, '>>>><>><')
  expect(TC20.getActiveToken()).toEqual({
    tokenMatch: 4,
    tokenType: 'CLOSEPAREN',
    value: ')'
  })
})
