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
  { tokenMatch: 0, tokenType: 'NUMBER', value: '3' },
  { tokenMatch: 1, tokenType: 'ADD', value: '+' },
  { tokenMatch: 2, tokenType: 'NUMBER', value: '2' }
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
  expect(arithmeticGrammar.tokenize()).toMatchObject(arithmeticGrammarOutput)
})

test('test toStrictEqual word and dot grammar', () => {
  expect(arithmeticGrammar.tokenize()).toStrictEqual(arithmeticGrammarOutput)
})

test('test determineTokenType method (NUMBER)', () => {
  expect(arithmeticGrammar._determineTokenType('ArithmeticGrammar', '3')).toBe('NUMBER')
})

test('test determineTokenType method (ADD)', () => {
  expect(arithmeticGrammar._determineTokenType('ArithmeticGrammar', '+')).toBe('ADD')
})

test('test determineTokenType method (NUMBER)', () => {
  expect(arithmeticGrammar._determineTokenType('ArithmeticGrammar', '2')).toBe('NUMBER')
})

/*
 * currentToken test cases
 */
test('test currentToken (wordDotGrammar)', () => {
  expect(wordDotGrammar.currentToken.tokenMatch).toBe(0)
})

test('test currentToken (arithmeticGrammar)', () => {
  expect(arithmeticGrammar.currentToken.tokenMatch).toBe(0)
})

/*
 * moveTo method test cases
 */
test('test moveTo(`next`)', () => {
  arithmeticGrammar.moveTo('next')
  expect(arithmeticGrammar.currentToken.value).toBe('+')
})

test('test moveTo(`next`)', () => {
  arithmeticGrammar.moveTo('next')
  expect(arithmeticGrammar.currentToken.value).toBe('2')
})

test('test moveTo(`previous`)', () => {
  arithmeticGrammar.moveTo('previous')
  expect(arithmeticGrammar.currentToken.value).toBe('+')
})

test('test moveTo(`previous`)', () => {
  arithmeticGrammar.moveTo('previous')
  expect(arithmeticGrammar.currentToken.value).toBe('3')
})

test('test moveTo()', () => {
  expect(() => {
    arithmeticGrammar.moveTo('up').toThrow('Invalid direction')
  })
})

test('test moveTo(`up`)', () => {
  expect(() => {
    arithmeticGrammar.moveTo().toThrow('Invalid direction')
  })
})
