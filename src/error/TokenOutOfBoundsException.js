export default class TokenOutOfBoundsException extends Error {
  constructor(message) {
    super(message)
    this.name = "TokenOutOfBoundsException"
  }
}
