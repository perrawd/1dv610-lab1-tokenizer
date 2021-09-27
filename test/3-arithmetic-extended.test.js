import { jest, expect } from '@jest/globals'
import LexicalGrammar from '../src/lib/lexical-grammar/lexical-grammar.js'
import GRAMMAR_TYPE from '../src/lib/lexical-grammar/grammar-name.js'
import LexicalAnalysis from '../src/lexical-analysis.js'
import sequenceOperator from './utils/sequence-operator.js'

const { ARITHMETIC } = GRAMMAR_TYPE

const arithmeticGrammar = new LexicalGrammar(ARITHMETIC)

describe('Arithmetic test suite', () => {
  /*
   * Arithmetic grammar test cases
   */
  test('Test case 3.1: Token value - should match token type SUB.', () => {
    const arithmeticTest = new LexicalAnalysis(arithmeticGrammar, '60   - (18)')
    sequenceOperator(arithmeticTest, '>><><')
    expect(arithmeticTest.getActiveToken()).toEqual({
      tokenMatch: 1,
      tokenType: 'SUB',
      value: '-'
    })
  })

  test('Test case 3.2: Token value / should match token type DIV.', () => {
    const arithmeticTest = new LexicalAnalysis(arithmeticGrammar, '160 /  4.0 + 2')
    sequenceOperator(arithmeticTest, '>>><>><<<')
    expect(arithmeticTest.getActiveToken()).toEqual({
      tokenMatch: 1,
      tokenType: 'DIV',
      value: '/'
    })
  })

  test('Test case 3.3: Token value ( should match token type OPENPAREN.', () => {
    const arithmeticTest = new LexicalAnalysis(arithmeticGrammar, '(58 + 8) - (8  * 3)')
    sequenceOperator(arithmeticTest, '>>><>>><>>')
    expect(arithmeticTest.getActiveToken()).toEqual({
      tokenMatch: 6,
      tokenType: 'OPENPAREN',
      value: '('
    })
  })

  test('Test case 3.4: Token value ) should match token type CLOSEPAREN.', () => {
    const arithmeticTest = new LexicalAnalysis(arithmeticGrammar, '(89.5 + 45.5) / 3')
    sequenceOperator(arithmeticTest, '>>>><>><')
    expect(arithmeticTest.getActiveToken()).toEqual({
      tokenMatch: 4,
      tokenType: 'CLOSEPAREN',
      value: ')'
    })
  })

  test('Test case 3.5: Grammar should be able to handle no whitespaces between substrings.', () => {
    const arithmeticTest = new LexicalAnalysis(arithmeticGrammar, '100-16/2')
    sequenceOperator(arithmeticTest, '>>>')
    expect(arithmeticTest.getActiveToken()).toEqual({
      tokenMatch: 3,
      tokenType: 'DIV',
      value: '/'
    })
  })

  test('Test case 3.6: Invalid token type should throw Error', () => {
    const spy = jest.spyOn(console, 'error').mockReturnValue()
    const arithmeticTest = new LexicalAnalysis(arithmeticGrammar, '42 /      HEJ  ')
    sequenceOperator(arithmeticTest, '>>')
    expect(() => {
      arithmeticTest.toThrow('No matches found for this subtoken!')
    })
    spy.mockRestore()
  })

  test('Test case 3.7: After end of tokenized string should append END token.', () => {
    const arithmeticTest = new LexicalAnalysis(arithmeticGrammar, '84/2')
    sequenceOperator(arithmeticTest, '>>>')
    expect(arithmeticTest.getActiveToken()).toEqual({
      tokenMatch: 3,
      tokenType: 'END',
      value: 'END'
    })
  })

  test('Test case 3.8: Set active token before first token should throw Error', () => {
    const spy = jest.spyOn(console, 'error').mockReturnValue()
    const arithmeticTest = new LexicalAnalysis(arithmeticGrammar, '126/3')
    sequenceOperator(arithmeticTest, '><')
    expect(() => {
      arithmeticTest.setActiveTokenToPrevious().toThrow('First token has been reached.')
    })
    spy.mockRestore()
  })

  test('Test case 3.9: Set active token after END token should throw Error', () => {
    const spy = jest.spyOn(console, 'error').mockReturnValue()
    const arithmeticTest = new LexicalAnalysis(arithmeticGrammar, '45-3.0/2')
    sequenceOperator(arithmeticTest, '>>>>>')
    expect(() => {
      arithmeticTest.toThrow('Last token has been reached.')
    })
    spy.mockRestore()
  })
})
