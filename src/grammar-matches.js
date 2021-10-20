import Token from './token.js'

export default class GrammarMatches extends Array {
  constructor (tokenTypes) {
    super()
    this._matches = []
    this._tokenTypes = tokenTypes
  }

   _getGrammarMatchesFor (subString) {
    try {
      this._matchTokenTypesTo(subString)
      if (!this._matches.length) { throw new Error('No matches found for this substring.') }
      return this._matches
    } catch (error) {
      this._processError(error)
    }
  }

   _matchTokenTypesTo (subString) {
    for (const [tokenType, pattern] of Object.entries(this._tokenTypes)) {
      if (this._patternMatch(pattern, subString)) {
        this._matches.push(this._createNewTokenWith(0, tokenType, subString.match(pattern)[0]))
      }
    }
  }

   _patternMatch (pattern, subString) {
    return new RegExp(pattern).test(subString)
  }

   _createNewTokenWith (index, tokenType, value) {
    return new Token(index, tokenType, value)
  }
}

