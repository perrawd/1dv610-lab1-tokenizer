import GrammarMatches from './grammar-matches.js'

export default class LongestMatch {
  constructor (subString, tokenTypes) {
    this._grammarMatches = new GrammarMatches(tokenTypes)
    this._matches = this._grammarMatches._getGrammarMatchesFor(subString)
  }

  getLongestMatch () {
    return this._matches.sort((a, b) => b.value.length - a.value.length)[0]
  }
}
