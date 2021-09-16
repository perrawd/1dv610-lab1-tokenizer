import { expect } from '@jest/globals'
import GrammaticType from '../types/GrammarType.js'
import GRAMMAR from './grammar.js'
import Tokenizer from './tokenizer'

const { WORD_AND_DOT } = GRAMMAR

const wordAndDotGrammar = new GrammaticType(WORD_AND_DOT)

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
