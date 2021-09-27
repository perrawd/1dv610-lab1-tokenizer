import { jest, expect } from '@jest/globals'
import sequenceOperator from './utils/sequence-operator.js'
import LexicalGrammar from '../src/lib/lexical-grammar/lexical-grammar.js'
import GRAMMAR_TYPE from '../src/lib/lexical-grammar/grammar-name.js'
import LexicalAnalysis from '../src/lexical-analysis.js'

const { WORD_AND_DOT } = GRAMMAR_TYPE

const wordAndDotGrammar = new LexicalGrammar(WORD_AND_DOT)

describe('wordDotGrammar Test Suite', () => {
  /*
 * wordDotGrammar test cases
 */
  test('Test case 1.1: Get active token should match token type WORD.', () => {
    const wordAndDotTest = new LexicalAnalysis(wordAndDotGrammar, 'a')
    expect(wordAndDotTest.getActiveToken()).toEqual({
      tokenMatch: 0,
      tokenType: 'WORD',
      value: 'a'
    })
  })

  test('Test case 1.2: Get next active token should match token type WORD.', () => {
    const wordAndDotTest = new LexicalAnalysis(wordAndDotGrammar, 'a aa')
    wordAndDotTest.setActiveTokenToNext()
    expect(
      wordAndDotTest.getActiveToken())
      .toEqual({
        tokenMatch: 1,
        tokenType: 'WORD',
        value: 'aa'
      })
  })

  test('Test case 1.3: Get next active token should match token type DOT.', () => {
    const wordAndDotTest = new LexicalAnalysis(wordAndDotGrammar, 'a.b')
    wordAndDotTest.setActiveTokenToNext()
    expect(wordAndDotTest.getActiveToken()).toEqual({
      tokenMatch: 1,
      tokenType: 'DOT',
      value: '.'
    })
  })

  test('Test case 1.4: Token at sequence >> should match token type WORD.', () => {
    const wordAndDotTest = new LexicalAnalysis(wordAndDotGrammar, 'a.b')
    sequenceOperator(wordAndDotTest, '>>')
    expect(wordAndDotTest.getActiveToken()).toEqual({
      tokenMatch: 2,
      tokenType: 'WORD',
      value: 'b'
    })
  })

  test('Test case 1.5: Token at sequence >> should match token type WORD.', () => {
    const wordAndDotTest = new LexicalAnalysis(wordAndDotGrammar, 'aa. b')
    sequenceOperator(wordAndDotTest, '>>')
    expect(wordAndDotTest.getActiveToken()).toEqual({
      tokenMatch: 2,
      tokenType: 'WORD',
      value: 'b'
    })
  })

  test('Test case 1.6: Token at sequence >>< should match token type DOT.', () => {
    const wordAndDotTest = new LexicalAnalysis(wordAndDotGrammar, 'a .b')
    sequenceOperator(wordAndDotTest, '>><')
    expect(wordAndDotTest.getActiveToken()).toEqual({
      tokenMatch: 1,
      tokenType: 'DOT',
      value: '.'
    })
  })

  test('Test case 1.7: Empty passed string should append END token.', () => {
    const wordAndDotTest = new LexicalAnalysis(wordAndDotGrammar, '')
    expect(wordAndDotTest.getActiveToken()).toEqual({
      tokenMatch: 0,
      tokenType: 'END',
      value: 'END'
    })
  })

  test('Test case 1.8: String with only whitespace should append END token.', () => {
    const wordAndDotTest = new LexicalAnalysis(wordAndDotGrammar, ' ')
    expect(wordAndDotTest.getActiveToken()).toEqual({
      tokenMatch: 0,
      tokenType: 'END',
      value: 'END'
    })
  })

  test('Test case 1.9: After end of tokenized string should append END token.', () => {
    const wordAndDotTest = new LexicalAnalysis(wordAndDotGrammar, 'a')
    sequenceOperator(wordAndDotTest, '>')
    expect(wordAndDotTest.getActiveToken()).toEqual({
      tokenMatch: 1,
      tokenType: 'END',
      value: 'END'
    })
  })

  test('Test case 1.10: Set active token before first token should throw Error', () => {
    const spy = jest.spyOn(console, 'error').mockReturnValue()
    const wordAndDotTest = new LexicalAnalysis(wordAndDotGrammar, 'a')
    expect(() => {
      wordAndDotTest.setActiveTokenToPrevious().toThrow('First index reached')
    })
    spy.mockRestore()
  })

  test('Test case 1.11: Invalid token type should throw Error', () => {
    const spy = jest.spyOn(console, 'error').mockReturnValue()
    const wordAndDotTest = new LexicalAnalysis(wordAndDotGrammar, '!')
    expect(() => {
      wordAndDotTest.toThrow('No matches found for this subtoken!')
    })
    spy.mockRestore()
  })
})
