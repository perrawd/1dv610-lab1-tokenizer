/**
 * Operates and calls each sequence.
 *
 * @param {object} grammar The grammar.
 * @param {string} sequence The sequence.
 */
const sequenceOperator = (grammar, sequence) => {
  try {
    const sequences = sequence.split('')
    for (const sequence of sequences) {
      switch (sequence) {
        case '>':
          grammar.setActiveTokenToNext()
          break
        case '<':
          grammar.setActiveTokenToPrevious()
          break
        default:
          throw new Error('Invalid sequence')
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export default sequenceOperator
