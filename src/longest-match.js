export default class LongestMatch {
  constructor (matches) {
    this._matches = matches
  }

  getLongestMatch () {
    return this._matches.sort((a, b) => b.value.length - a.value.length)[0]
  }
}
