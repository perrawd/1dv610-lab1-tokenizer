import Token from './token.js'
import LongestMatch from './longest-match.js'

export default class TokenMatch {
  constructor (lexicalGrammar) {
    this._tokenTypes = lexicalGrammar.tokenTypes
    this._index = 0
  }

  getTokenMatch (subString) {
    const maximumMunch = new LongestMatch(subString, this._tokenTypes)
    const longestMatch = maximumMunch.getLongestMatch()
    const token = this._createNewTokenWith(
      this._index,
      longestMatch.tokenType,
      longestMatch.value
    )
    this._index += 1
    return token
  }

   _createNewTokenWith (index, tokenType, value) {
    return new Token(index, tokenType, value)
  }

  getEndToken () {
    return this._createNewTokenWith(
      this._index,
      'END',
      'END'
    )
  }
}