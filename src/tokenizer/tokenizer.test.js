import { expect } from '@jest/globals'
import GrammaticType from '../types/GrammarType.js'
import GRAMMAR from './grammar.js'
import Tokenizer from './tokenizer'

const { WORD_AND_DOT, ARITHMETIC } = GRAMMAR

const wordAndDotGrammar = new GrammaticType(WORD_AND_DOT)
const arithmeticGrammar = new GrammaticType(ARITHMETIC)

/**
 * Operates and calls each sequence.
 *
 * @param {object} grammar The string.
 * @param {string} sequence The sequence.
 */
const sequenceOperator = (grammar, sequence) => {
  try {
    const arr = sequence.split('')
    for (const seq of arr) {
      switch (seq) {
        case '>':
          grammar.getNextToken()
          break
        case '<':
          grammar.getPreviousToken()
          break
        default:
          throw new Error('Invalid sequence')
      }
    }
  } catch (error) {
    console.error(error)
  }
}

/*
 * wordDotGrammar test cases
 */
test('TC.1', () => {
  const TC1 = new Tokenizer(wordAndDotGrammar, 'a')
  expect(TC1.activeToken).toMatchObject({
    tokenMatch: 0,
    tokenType: 'WORD',
    value: 'a'
  })
})

test('TC.2', () => {
  const TC2 = new Tokenizer(wordAndDotGrammar, 'a aa')
  TC2.getNextToken()
  expect(TC2.activeToken).toMatchObject({
    tokenMatch: 1,
    tokenType: 'WORD',
    value: 'aa'
  })
})

test('TC.3', () => {
  const TC3 = new Tokenizer(wordAndDotGrammar, 'a.b')
  TC3.getNextToken()
  expect(TC3.activeToken).toMatchObject({
    tokenMatch: 1,
    tokenType: 'DOT',
    value: '.'
  })
})

test('TC.4', () => {
  const TC4 = new Tokenizer(wordAndDotGrammar, 'a.b')
  sequenceOperator(TC4, '>>')
  expect(TC4.activeToken).toMatchObject({
    tokenMatch: 2,
    tokenType: 'WORD',
    value: 'b'
  })
})

test('TC.5', () => {
  const TC5 = new Tokenizer(wordAndDotGrammar, 'aa. b')
  sequenceOperator(TC5, '>>')
  expect(TC5.activeToken).toMatchObject({
    tokenMatch: 2,
    tokenType: 'WORD',
    value: 'b'
  })
})

test('TC.6', () => {
  const TC6 = new Tokenizer(wordAndDotGrammar, 'a .b')
  sequenceOperator(TC6, '>><')
  expect(TC6.activeToken).toMatchObject({
    tokenMatch: 1,
    tokenType: 'DOT',
    value: '.'
  })
})

test('TC.7', () => {
  const TC7 = new Tokenizer(wordAndDotGrammar, '')
  expect(TC7.activeToken).toMatchObject({
    tokenMatch: 0,
    tokenType: 'END',
    value: 'END'
  })
})

test('TC.8', () => {
  const TC8 = new Tokenizer(wordAndDotGrammar, ' ')
  expect(TC8.activeToken).toMatchObject({
    tokenMatch: 0,
    tokenType: 'END',
    value: 'END'
  })
})

test('TC.9', () => {
  const TC9 = new Tokenizer(wordAndDotGrammar, 'a')
  sequenceOperator(TC9, '>')
  expect(TC9.activeToken).toMatchObject({
    tokenMatch: 1,
    tokenType: 'END',
    value: 'END'
  })
})

test('TC.10', () => {
  const TC10 = new Tokenizer(wordAndDotGrammar, 'a')
  expect(() => {
    TC10.getPreviousToken().toThrow('First index reached')
  })
})

test('TC.11', () => {
  const TC10 = new Tokenizer(wordAndDotGrammar, '!')
  expect(() => {
    TC10.toThrow('No matches found for this subtoken!')
  })
})

/*
 * arithmeticGrammar test cases
 */
test('TC.12', () => {
  const TC12 = new Tokenizer(arithmeticGrammar, '3')
  expect(TC12.activeToken).toMatchObject({
    tokenMatch: 0,
    tokenType: 'NUMBER',
    value: '3'
  })
})

test('TC.13', () => {
  const TC13 = new Tokenizer(arithmeticGrammar, '3.14')
  expect(TC13.activeToken).toMatchObject({
    tokenMatch: 0,
    tokenType: 'NUMBER',
    value: '3.14'
  })
})

test('TC.14', () => {
  const TC14 = new Tokenizer(arithmeticGrammar, '3 + 54 * 4')
  sequenceOperator(TC14, '>>>')
  expect(TC14.activeToken).toMatchObject({
    tokenMatch: 3,
    tokenType: 'MUL',
    value: '*'
  })
})

test('TC.15', () => {
  const TC15 = new Tokenizer(arithmeticGrammar, '3+5 # 4')
  sequenceOperator(TC15, '>>>')
  expect(() => {
    TC15.toThrow('No matches found for this subtoken!')
  })
})

test('TC.16', () => {
  const TC16 = new Tokenizer(arithmeticGrammar, '3.0+54.1     + 4.2')
  sequenceOperator(TC16, '><>>>')
  expect(TC16.activeToken).toMatchObject({
    tokenMatch: 3,
    tokenType: 'ADD',
    value: '+'
  })
})
