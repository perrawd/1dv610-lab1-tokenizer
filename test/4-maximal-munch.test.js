import { jest, expect } from '@jest/globals'
import LexicalGrammar from '../src/lib/lexical-grammar/lexical-grammar.js'
import GRAMMAR_TYPE from '../src/lib/lexical-grammar/grammar-name.js'
import LexicalAnalysis from '../src/lexical-analysis.js'
import sequenceOperator from './utils/sequence-operator.js'
import LongestMatch from '../src/longest-match.js'

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
    const longestMatchTest = new LongestMatch('1.23', maximalMunchGrammar.tokenTypes)
    expect(longestMatchTest.getLongestMatch()).toEqual(
      {
        tokenMatch: 0,
        tokenType: 'FLOAT',
        value: '1.23'
      }
    )
  })

  test('Test case 4.3: Grammar should be able to handle Maximum Munch in string with no whitespaces.', () => {
    const maximalMunchTest = new LexicalAnalysis(maximalMunchGrammar, '1.131312+8-40.7237')
    sequenceOperator(maximalMunchTest, '>>>>')
    expect(maximalMunchTest.getActiveToken()).toEqual({
      tokenMatch: 4,
      tokenType: 'FLOAT',
      value: '40.7237'
    })
  })

  test('Test case 4.4: After end of tokenized string should append END token.', () => {
    const maximalMunchTest = new LexicalAnalysis(maximalMunchGrammar, '43+9.323-32.8375')
    sequenceOperator(maximalMunchTest, '>>>>>')
    expect(maximalMunchTest.getActiveToken()).toEqual({
      tokenMatch: 5,
      tokenType: 'END',
      value: 'END'
    })
  })

  test('Test case 4.5: Set active token after END token should throw Error', () => {
    const spy = jest.spyOn(console, 'error').mockReturnValue()
    const maximalMunchTest = new LexicalAnalysis(maximalMunchGrammar, '34.54-6.0')
    sequenceOperator(maximalMunchTest, '>>>>')
    expect(() => {
      maximalMunchTest.toThrow('Last token has been reached.')
    })
    spy.mockRestore()
  })
})
