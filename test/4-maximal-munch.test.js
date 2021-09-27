import { expect } from '@jest/globals'
import LexicalGrammar from '../src/lib/lexical-grammar/lexical-grammar.js'
import GRAMMAR_TYPE from '../src/lib/lexical-grammar/grammar-name.js'
import LexicalAnalysis from '../src/lexical-analysis.js'

const { MAXIMAL_MUNCH } = GRAMMAR_TYPE

const maximalMunchGrammar = new LexicalGrammar(MAXIMAL_MUNCH)

/*
 * Maximal munch grammar test cases
 */
describe('Maximal munch grammar test suite', () => {
  test('Test case 4.1: Should return the longest match for substring 1.23', () => {
    const maximalMunchTest = new LexicalAnalysis(maximalMunchGrammar, '1.23 + 40.77')
    expect(maximalMunchTest.getActiveToken()).toEqual({
      tokenMatch: 0,
      tokenType: 'FLOAT',
      value: '1.23'
    })
  })

  test('Test case 4.2: getlongestMatchFrom method should return the longest match from array of matches', () => {
    const maximalMunchTest = new LexicalAnalysis(maximalMunchGrammar, '')
    const matches = [
      {
        tokenMatch: 0,
        tokenType: 'INTEGER',
        value: '1'
      },
      {
        tokenMatch: 0,
        tokenType: 'FLOAT',
        value: '1.23'
      }
    ]
    expect(maximalMunchTest._getlongestMatchFrom(matches)).toEqual(
      {
        tokenMatch: 0,
        tokenType: 'FLOAT',
        value: '1.23'
      }
    )
  })

  test('TC.17 SUB', () => {
    const maximalMunchTest = new LexicalAnalysis(maximalMunchGrammar, '1. + 40.77')
    expect(maximalMunchTest.getActiveToken()).toEqual({
      tokenMatch: 0,
      tokenType: 'INTEGER',
      value: '1'
    })
  })
})
