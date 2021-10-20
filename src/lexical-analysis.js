import TokenList from './token-list.js'
import manageError from './error/error-handling.js'

export default class LexicalAnalysis {
  constructor (lexicalGrammar, string) {
    this._tokenList = new TokenList(lexicalGrammar, string)
    this._activeTokenIndex = 0
    this._activeToken = this._tokenList[this._activeTokenIndex]
  }

  setActiveTokenToPrevious () {
    try {
      if (this._isFirstToken()) { throw new Error('First token has been reached.') }
      this._updateActiveTokenIndexToPrevious()
      this._setActiveToken()
    } catch (error) {
      this._processError(error)
    }
  }

  _isFirstToken () {
    return this._activeTokenIndex === 0
  }

  _updateActiveTokenIndexToPrevious () {
    this._activeTokenIndex -= 1
  }

  _setActiveToken () {
    this._activeToken = this._tokenList[this._activeTokenIndex]
  }

  setActiveTokenToNext () {
    try {
      if (this._isEndToken()) { throw new Error('Last token has been reached.') }
      this._tokenList._processNextToken()
      this._updateActiveTokenIndexToNext()
      this._setActiveToken()
    } catch (error) {
      manageError(error)
    }
  }

  _isEndToken () {
    return this._tokenList[this._tokenList.length - 1].tokenType === 'END'
  }

  _updateActiveTokenIndexToNext () {
    this._activeTokenIndex += 1
  }

  getActiveToken () {
    return this._activeToken
  }

  getTokenList () {
    return this._tokenList
  }
}
