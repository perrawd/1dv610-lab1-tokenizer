export default class TokenMatchException extends Error {
  constructor(message) {
    super(message)
    this.name = "TokenMatchException"
  }
}
