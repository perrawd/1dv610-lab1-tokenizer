import { jest, expect } from '@jest/globals'
import LexicalGrammar from '../src/lib/lexical-grammar/lexical-grammar.js'
import GRAMMAR_TYPE from '../src/lib/lexical-grammar/grammar-type.js'
import LexicalAnalysis from '../src/lexical-analysis.js'
import sequenceOperator from './utils/sequence-operator.js'

const { ARITHMETIC } = GRAMMAR_TYPE

const arithmeticGrammar = new LexicalGrammar(ARITHMETIC)

test('TC.17 SUB', () => {
  const TC17 = new LexicalAnalysis(arithmeticGrammar, '60   - (18)')
  sequenceOperator(TC17, '>><><')
  expect(TC17.getActiveToken()).toEqual({
    tokenMatch: 1,
    tokenType: 'SUB',
    value: '-'
  })
})

test('TC.18 DIV', () => {
  const TC18 = new LexicalAnalysis(arithmeticGrammar, '160 /  4.0 + 2')
  sequenceOperator(TC18, '>>><>><<<')
  expect(TC18.getActiveToken()).toEqual({
    tokenMatch: 1,
    tokenType: 'DIV',
    value: '/'
  })
})

test('TC.19 OPEN PARENTHESIS', () => {
  const TC19 = new LexicalAnalysis(arithmeticGrammar, '(58 + 8) - (8  * 3)')
  sequenceOperator(TC19, '>>><>>><>>')
  expect(TC19.getActiveToken()).toEqual({
    tokenMatch: 6,
    tokenType: 'OPENPAREN',
    value: '('
  })
})

test('TC.19 OPEN PARENTHESIS', () => {
  const TC20 = new LexicalAnalysis(arithmeticGrammar, '(89.5 + 45.5) / 3')
  sequenceOperator(TC20, '>>>><>><')
  expect(TC20.getActiveToken()).toEqual({
    tokenMatch: 4,
    tokenType: 'CLOSEPAREN',
    value: ')'
  })
})

test('TC.19 STRING', () => {
  const TC20 = new LexicalAnalysis(arithmeticGrammar, '100-16/2')
  sequenceOperator(TC20, '>>>')
  expect(TC20.getActiveToken()).toEqual({
    tokenMatch: 3,
    tokenType: 'DIV',
    value: '/'
  })
})

test('TC.15 STRING', () => {
  const spy = jest.spyOn(console, 'error').mockReturnValue()
  const TC15 = new LexicalAnalysis(arithmeticGrammar, '42 /      HEJ  ')
  sequenceOperator(TC15, '>>')
  expect(() => {
    TC15.toThrow('No matches found for this subtoken!')
  })
  spy.mockRestore()
})
