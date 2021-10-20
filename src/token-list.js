import TokenMatch from './token-match.js'
import manageError from './error/error-handling.js'

export default class TokenList extends Array {
  constructor (lexicalGrammar, string) {
    super()
    this._string = string
    this._tokenMatch = new TokenMatch(lexicalGrammar)
    this._delimiter = lexicalGrammar.delimiter
    this._trim = lexicalGrammar.trim

    this._processNextToken()
  }

   _processNextToken () {
    try {
      if (this._isEmpty(this._string)) {
        this._appendEndTokenToTokenList()
      } else {
        this._appendNextTokenToTokenList()
      }
    } catch (error) {
      manageError(error)
    }
  }

  _isEmpty (string) {
    return !string.trim().length
  }

  _appendEndTokenToTokenList () {
    const endToken = this._tokenMatch.getEndToken()
    this._appendToTokenList(endToken)
  }

  _appendToTokenList (token) {
    this.push(token)
  }

  _appendNextTokenToTokenList () {
    const token = this._processAndTokenizeNextSubString()
    this._appendToTokenList(token)
  }

  _processAndTokenizeNextSubString () {
    if (this._trim) this._trimString()
    const subString = this._getNextSubStringFrom(this._string)
    this._cutFromString(subString)
    const tokenMatch = this._tokenMatch.getTokenMatch(subString)
    return tokenMatch
  }

  _trimString () {
    this._string = this._string.trim()
  }

  _getNextSubStringFrom (string) {
    return string.slice(0, this._string.search(this._delimiter) + 1)
  }

  _cutFromString (subString) {
    this._string = this._string.replace(subString, '')
  }

  _processError (error) {
    console.error(`Error: ${error.message}`)
    process.exitCode = 1
  }
}
