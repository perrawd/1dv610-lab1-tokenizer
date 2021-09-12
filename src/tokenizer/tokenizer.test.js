/**
 * Test suite for the Tokenizer class.
 *
 */
import { expect } from '@jest/globals'
import GrammaticType from '../types/GrammarType.js'
import GRAMMAR from './grammar.js'
import Tokenizer from './tokenizer'

const { WORD_AND_DOT, ARITHMETIC } = GRAMMAR
const testWordAndGrammar = new GrammaticType(WORD_AND_DOT)
const testArithmetic = new GrammaticType(ARITHMETIC)

/*
 * Initialize objects.
 */
const wordDotGrammar = new Tokenizer(testWordAndGrammar, 'Meningen består av ord.')
const arithmeticGrammar = new Tokenizer(testArithmetic, '32+2')

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
  { tokenMatch: 0, tokenType: 'NUMBER', value: '32' },
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

/*
 * arithmeticGrammar test cases
 */
test('test toMatchObject arithmetic grammar', () => {
  expect(arithmeticGrammar.tokenize()).toMatchObject(arithmeticGrammarOutput)
})

test('test toStrictEqual arithmetic grammar', () => {
  expect(arithmeticGrammar.tokenize()).toStrictEqual(arithmeticGrammarOutput)
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
  arithmeticGrammar.moveCurrentTokenTo('next')
  expect(arithmeticGrammar.currentToken.value).toBe('+')
})

test('test moveTo(`next`)', () => {
  arithmeticGrammar.moveCurrentTokenTo('next')
  expect(arithmeticGrammar.currentToken.value).toBe('2')
})

test('test moveTo(`previous`)', () => {
  arithmeticGrammar.moveCurrentTokenTo('previous')
  expect(arithmeticGrammar.currentToken.value).toBe('+')
})

test('test moveTo(`previous`)', () => {
  arithmeticGrammar.moveCurrentTokenTo('previous')
  expect(arithmeticGrammar.currentToken.value).toBe('3')
})

test('test moveTo()', () => {
  expect(() => {
    arithmeticGrammar.moveCurrentTokenTo('up').toThrow('Invalid direction')
  })
})

test('test moveTo(`up`)', () => {
  expect(() => {
    arithmeticGrammar.moveCurrentTokenTo().toThrow('Invalid direction')
  })
})
