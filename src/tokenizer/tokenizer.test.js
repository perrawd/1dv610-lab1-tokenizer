/**
 * Test suite for the Tokenizer class.
 *
 */
import { expect } from '@jest/globals'
import Tokenizer from './tokenizer'

/*
 * Initialize objects.
 */
const wordDotGrammar = new Tokenizer('WordAndDotGrammar', 'Meningen består av ord.')
const arithmeticGrammar = new Tokenizer('ArithmeticGrammar', '3+2')

/*
 * Expected outputs.
 */
const wordDotGrammarOutput = [
  { tokenMatch: 0, tokenType: 'WORD', value: 'Meningen' },
  { tokenMatch: 1, tokenType: 'WORD', value: 'består' },
  { tokenMatch: 2, tokenType: 'WORD', value: 'av' },
  { tokenMatch: 3, tokenType: 'WORD', value: 'ord' },
  { tokenMatch: 4, tokenType: 'DOT', value: '.' }
]

const arithmeticGrammarOutput = [
  { tokenMatch: 0, tokenType: 'NUMBER', value: 3 },
  { tokenMatch: 1, tokenType: 'ADD', value: '+' },
  { tokenMatch: 2, tokenType: 'NUMBER', value: 2 }
]

/*
 * wordDotGrammar test cases
 */
test('test toMatchObject word and dot grammar', () => {
  expect(wordDotGrammar.tokenize()).toMatchObject(wordDotGrammarOutput)
})

test('test toStrictEqual word and dot grammar', () => {
  expect(wordDotGrammar.tokenize()).toStrictEqual(wordDotGrammarOutput)
})

test('test determineTokenType method (WORD)', () => {
  expect(wordDotGrammar._determineTokenType('WordAndDotGrammar', 'Ord')).toBe('WORD')
})

test('test determineTokenType method (DOT)', () => {
  expect(wordDotGrammar._determineTokenType('WordAndDotGrammar', '.')).toBe('DOT')
})

/*
 * arithmeticGrammar test cases
 */
test('test toMatchObject word and dot grammar', () => {
  expect(arithmeticGrammar.tokenize()).toMatchObject('ArithmeticGrammar', arithmeticGrammarOutput)
})

test('test toStrictEqual word and dot grammar', () => {
  expect(arithmeticGrammar.tokenize()).toStrictEqual('ArithmeticGrammar', arithmeticGrammarOutput)
})

test('test determineTokenType method (WORD)', () => {
  expect(arithmeticGrammar._determineTokenType(3)).toBe('NUMBER')
})

test('test determineTokenType method (DOT)', () => {
  expect(arithmeticGrammar._determineTokenType('+')).toBe('ADD')
})

test('test determineTokenType method (DOT)', () => {
  expect(arithmeticGrammar._determineTokenType(2)).toBe('NUMBER')
})
