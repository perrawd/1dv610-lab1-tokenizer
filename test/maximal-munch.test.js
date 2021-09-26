import { expect } from '@jest/globals'
import LexicalGrammar from '../src/lib/lexical-grammar.js'
import GRAMMAR_TYPE from '../src/lib/grammar-type.js'
import Tokenizer from '../src/tokenizer.js'

const { MAXIMAL_MUNCH } = GRAMMAR_TYPE

const maximalMunchGrammar = new LexicalGrammar(MAXIMAL_MUNCH)

test('TC.17 SUB', () => {
  const TC17 = new Tokenizer(maximalMunchGrammar, '1.23 + 40.77')
  expect(TC17.getActiveToken()).toEqual({
    tokenMatch: 0,
    tokenType: 'FLOAT',
    value: '1.23'
  })
})

test('TC.17 SUB', () => {
  const TC17 = new Tokenizer(maximalMunchGrammar, '')
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
  expect(TC17._getlongestMatchFrom(matches)).toEqual(
    {
      tokenMatch: 0,
      tokenType: 'FLOAT',
      value: '1.23'
    }
  )
})

test('TC.17 SUB', () => {
  const TC17 = new Tokenizer(maximalMunchGrammar, '1. + 40.77')
  expect(TC17.getActiveToken()).toEqual({
    tokenMatch: 0,
    tokenType: 'INTEGER',
    value: '1'
  })
})
