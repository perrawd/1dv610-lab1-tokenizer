import { expect } from '@jest/globals'
import Tokenizer from './tokenizer'

const wordDotGrammar = new Tokenizer('WordAndDotGrammar', 'Meningen består av ord.')

const wordDotGrammarOutput = [
  { tokenMatch: 0, tokenType: 'WORD', value: 'Meningen' },
  { tokenMatch: 1, tokenType: 'WORD', value: 'består' },
  { tokenMatch: 2, tokenType: 'WORD', value: 'av' },
  { tokenMatch: 3, tokenType: 'WORD', value: 'ord' },
  { tokenMatch: 4, tokenType: 'DOT', value: '.' }
]

test('test toMatchObject word and dot grammar', () => {
  expect(wordDotGrammar.tokenize()).toMatchObject(wordDotGrammarOutput)
})

test('test toStrictEqual word and dot grammar', () => {
  expect(wordDotGrammar.tokenize()).toStrictEqual(wordDotGrammarOutput)
})

test('test determineTokenType method (WORD)', () => {
  expect(wordDotGrammar._determineTokenType('Ord')).toBe('WORD')
})

test('test determineTokenType method (DOT)', () => {
  expect(wordDotGrammar._determineTokenType('.')).toBe('DOT')
})
