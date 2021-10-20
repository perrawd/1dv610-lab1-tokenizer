import GrammarMatches from './grammar-matches.js'

export default class LongestMatch {
  constructor(subString, tokenTypes) {
    this._grammarMatches = new GrammarMatches(tokenTypes)
    this._matches = this._grammarMatches.getGrammarMatchesFor(subString)
  }

  getLongestMatch() {
    return this._matches.sort((primary, secondary) => secondary.value.length - primary.value.length)[0]
  }
}
