import { expect } from '@jest/globals'
import Tokenizer from './tokenizer'

const wordDotGrammar = new Tokenizer('WordAndDotGrammar', 'Meningen består av ord.')

test('test word and dot grammar', () => {
  expect(wordDotGrammar.tokenize()).toStrictEqual(
    [
      { tokenMatch: 0, tokenType: 'WORD', value: 'Meningen' },
      { tokenMatch: 1, tokenType: 'WORD', value: 'består' },
      { tokenMatch: 2, tokenType: 'WORD', value: 'av' },
      { tokenMatch: 3, tokenType: 'WORD', value: 'ord' },
      { tokenMatch: 4, tokenType: 'DOT', value: '.' }
    ]
  )
})
