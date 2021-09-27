import { jest, expect } from '@jest/globals'
import sequenceOperator from './utils/sequence-operator.js'
import LexicalGrammar from '../src/lib/lexical-grammar/lexical-grammar.js'
import GRAMMAR_TYPE from '../src/lib/lexical-grammar/grammar-name.js'
import LexicalAnalysis from '../src/lexical-analysis.js'

const { ARITHMETIC } = GRAMMAR_TYPE

const arithmeticGrammar = new LexicalGrammar(ARITHMETIC)

describe('Arithmetic test suite', () => {
  /*
   * Arithmetic grammar test cases
   */
  test('Test case 2.1: Integer should match token type NUMBER', () => {
    const arithmeticTest = new LexicalAnalysis(arithmeticGrammar, '3')
    expect(arithmeticTest.getActiveToken()).toEqual({
      tokenMatch: 0,
      tokenType: 'NUMBER',
      value: '3'
    })
  })

  test('Test case 2.2: Float should match token type NUMBER', () => {
    const arithmeticTest = new LexicalAnalysis(arithmeticGrammar, '3.14')
    expect(arithmeticTest.getActiveToken()).toEqual({
      tokenMatch: 0,
      tokenType: 'NUMBER',
      value: '3.14'
    })
  })

  test('Test case 2.3: Token value * should return token type MUL', () => {
    const arithmeticTest = new LexicalAnalysis(arithmeticGrammar, '3 + 54 * 4')
    sequenceOperator(arithmeticTest, '>>>')
    expect(arithmeticTest.getActiveToken()).toEqual({
      tokenMatch: 3,
      tokenType: 'MUL',
      value: '*'
    })
  })

  test('Test case 2.4: Invalid token type should throw Error', () => {
    const spy = jest.spyOn(console, 'error').mockReturnValue()
    const arithmeticTest = new LexicalAnalysis(arithmeticGrammar, '3+5 # 4')
    sequenceOperator(arithmeticTest, '>>>')
    expect(() => {
      arithmeticTest.toThrow('No matches found for this subtoken!')
    })
    spy.mockRestore()
  })

  test('Test case 2.5: Token at sequence ><>>> should match token type ADD.', () => {
    const arithmeticTest = new LexicalAnalysis(arithmeticGrammar, '3.0+54.1     + 4.2')
    sequenceOperator(arithmeticTest, '><>>>')
    expect(arithmeticTest.getActiveToken()).toEqual({
      tokenMatch: 3,
      tokenType: 'ADD',
      value: '+'
    })
  })
})
