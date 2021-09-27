import { jest, expect } from '@jest/globals'
import sequenceOperator from './utils/sequence-operator.js'
import LexicalGrammar from '../src/lib/lexical-grammar.js'
import GRAMMAR_TYPE from '../src/lib/grammar-type.js'
import LexicalAnalysis from '../src/lexical-analysis.js'

const { WORD_AND_DOT, ARITHMETIC } = GRAMMAR_TYPE

const wordAndDotGrammar = new LexicalGrammar(WORD_AND_DOT)
const arithmeticGrammar = new LexicalGrammar(ARITHMETIC)

describe('wordDotGrammar Test Suite', () => {
  /*
 * wordDotGrammar test cases
 */
  test('TC.1', () => {
    const TC1 = new LexicalAnalysis(wordAndDotGrammar, 'a')
    expect(TC1.getActiveToken()).toEqual({
      tokenMatch: 0,
      tokenType: 'WORD',
      value: 'a'
    })
  })

  test('TC.2', () => {
    const TC2 = new LexicalAnalysis(wordAndDotGrammar, 'a aa')
    TC2.setActiveTokenToNext()
    expect(
      TC2.getActiveToken())
      .toEqual({
        tokenMatch: 1,
        tokenType: 'WORD',
        value: 'aa'
      })
  })

  test('TC.3', () => {
    const TC3 = new LexicalAnalysis(wordAndDotGrammar, 'a.b')
    TC3.setActiveTokenToNext()
    expect(TC3.getActiveToken()).toEqual({
      tokenMatch: 1,
      tokenType: 'DOT',
      value: '.'
    })
  })

  test('TC.4', () => {
    const TC4 = new LexicalAnalysis(wordAndDotGrammar, 'a.b')
    sequenceOperator(TC4, '>>')
    expect(TC4.getActiveToken()).toEqual({
      tokenMatch: 2,
      tokenType: 'WORD',
      value: 'b'
    })
  })

  test('TC.5', () => {
    const TC5 = new LexicalAnalysis(wordAndDotGrammar, 'aa. b')
    sequenceOperator(TC5, '>>')
    expect(TC5.getActiveToken()).toEqual({
      tokenMatch: 2,
      tokenType: 'WORD',
      value: 'b'
    })
  })

  test('TC.6', () => {
    const TC6 = new LexicalAnalysis(wordAndDotGrammar, 'a .b')
    sequenceOperator(TC6, '>><')
    expect(TC6.getActiveToken()).toEqual({
      tokenMatch: 1,
      tokenType: 'DOT',
      value: '.'
    })
  })

  test('TC.7', () => {
    const TC7 = new LexicalAnalysis(wordAndDotGrammar, '')
    expect(TC7.getActiveToken()).toEqual({
      tokenMatch: 0,
      tokenType: 'END',
      value: 'END'
    })
  })

  test('TC.8', () => {
    const TC8 = new LexicalAnalysis(wordAndDotGrammar, ' ')
    expect(TC8.getActiveToken()).toEqual({
      tokenMatch: 0,
      tokenType: 'END',
      value: 'END'
    })
  })

  test('TC.9', () => {
    const TC9 = new LexicalAnalysis(wordAndDotGrammar, 'a')
    sequenceOperator(TC9, '>')
    expect(TC9.getActiveToken()).toEqual({
      tokenMatch: 1,
      tokenType: 'END',
      value: 'END'
    })
  })

  test('TC.10', () => {
    const spy = jest.spyOn(console, 'error').mockReturnValue()
    const TC10 = new LexicalAnalysis(wordAndDotGrammar, 'a')
    expect(() => {
      TC10.setActiveTokenToPrevious().toThrow('First index reached')
    })
    spy.mockRestore()
  })

  test('TC.11', () => {
    const spy = jest.spyOn(console, 'error').mockReturnValue()
    const TC10 = new LexicalAnalysis(wordAndDotGrammar, '!')
    expect(() => {
      TC10.toThrow('No matches found for this subtoken!')
    })
    spy.mockRestore()
  })
})

describe('arithmeticGrammar Test Suite', () => {
  /*
   * arithmeticGrammar test cases
   */
  test('TC.12', () => {
    const TC12 = new LexicalAnalysis(arithmeticGrammar, '3')
    expect(TC12.getActiveToken()).toEqual({
      tokenMatch: 0,
      tokenType: 'NUMBER',
      value: '3'
    })
  })

  test('TC.13', () => {
    const TC13 = new LexicalAnalysis(arithmeticGrammar, '3.14')
    expect(TC13.getActiveToken()).toEqual({
      tokenMatch: 0,
      tokenType: 'NUMBER',
      value: '3.14'
    })
  })

  test('TC.14', () => {
    const TC14 = new LexicalAnalysis(arithmeticGrammar, '3 + 54 * 4')
    sequenceOperator(TC14, '>>>')
    expect(TC14.getActiveToken()).toEqual({
      tokenMatch: 3,
      tokenType: 'MUL',
      value: '*'
    })
  })

  test('TC.15', () => {
    const spy = jest.spyOn(console, 'error').mockReturnValue()
    const TC15 = new LexicalAnalysis(arithmeticGrammar, '3+5 # 4')
    sequenceOperator(TC15, '>>>')
    expect(() => {
      TC15.toThrow('No matches found for this subtoken!')
    })
    spy.mockRestore()
  })

  test('TC.16', () => {
    const TC16 = new LexicalAnalysis(arithmeticGrammar, '3.0+54.1     + 4.2')
    sequenceOperator(TC16, '><>>>')
    expect(TC16.getActiveToken()).toEqual({
      tokenMatch: 3,
      tokenType: 'ADD',
      value: '+'
    })
  })
})
