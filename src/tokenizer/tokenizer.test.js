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
  { tokenMatch: 4, tokenType: 'DOT', value: '.' },
  { tokenMatch: 5, tokenType: 'END', value: '' }
]

const arithmeticGrammarOutput = [
  { tokenMatch: 0, tokenType: 'NUMBER', value: '32' },
  { tokenMatch: 1, tokenType: 'ADD', value: '+' },
  { tokenMatch: 2, tokenType: 'NUMBER', value: '2' },
  { tokenMatch: 3, tokenType: 'END', value: '' }
]

/*
 * wordDotGrammar test cases
 */
test('test END token in word and dot grammar', () => {
  expect(wordDotGrammar.lexicalGrammar[wordDotGrammar.lexicalGrammar.length - 1].tokenType).toBe('END')
})

test('test END token in arithmetic grammar', () => {
  expect(arithmeticGrammar.lexicalGrammar[arithmeticGrammar.lexicalGrammar.length - 1].tokenType).toBe('END')
})

/*
 * wordDotGrammar test cases
 */
test('test toMatchObject word and dot grammar', () => {
  expect(wordDotGrammar.lexicalGrammar).toMatchObject(wordDotGrammarOutput)
})

test('test toStrictEqual word and dot grammar', () => {
  expect(wordDotGrammar.lexicalGrammar).toStrictEqual(wordDotGrammarOutput)
})

test('test toStrictEqual word and dot grammar', () => {
  expect(wordDotGrammar.lexicalGrammar).toStrictEqual(wordDotGrammarOutput)
})

/*
 * arithmeticGrammar test cases
 */
test('test toMatchObject arithmetic grammar', () => {
  expect(arithmeticGrammar.lexicalGrammar).toMatchObject(arithmeticGrammarOutput)
})

test('test toStrictEqual arithmetic grammar', () => {
  expect(arithmeticGrammar.lexicalGrammar).toStrictEqual(arithmeticGrammarOutput)
})

/*
 * activeToken test cases
 */
test('test activeToken (wordDotGrammar)', () => {
  expect(wordDotGrammar.activeToken.tokenMatch).toBe(0)
})

test('test activeToken (arithmeticGrammar)', () => {
  expect(arithmeticGrammar.activeToken.tokenMatch).toBe(0)
})

/*
 * moveTo method test cases
 */
test('test moveTo(`next`)', () => {
  arithmeticGrammar.moveActiveTokenTo('next')
  expect(arithmeticGrammar.activeToken.value).toBe('+')
})

test('test moveTo(`next`)', () => {
  arithmeticGrammar.moveActiveTokenTo('next')
  expect(arithmeticGrammar.activeToken.value).toBe('2')
})

test('test moveTo(`previous`)', () => {
  arithmeticGrammar.moveActiveTokenTo('previous')
  expect(arithmeticGrammar.activeToken.value).toBe('+')
})

test('test moveTo(`previous`)', () => {
  arithmeticGrammar.moveActiveTokenTo('previous')
  expect(arithmeticGrammar.activeToken.value).toBe('32')
})

test('test moveTo()', () => {
  expect(() => {
    arithmeticGrammar.moveActiveTokenTo('up').toThrow('Invalid direction')
  })
})

test('test moveTo(`up`)', () => {
  expect(() => {
    arithmeticGrammar.moveActiveTokenTo().toThrow('Invalid direction')
  })
})
