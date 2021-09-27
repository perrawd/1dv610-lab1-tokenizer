/**
 * Operates and calls each sequence.
 *
 * @param {object} tokenList The grammar.
 * @param {string} sequence The sequence.
 */
const sequenceOperator = (tokenList, sequence) => {
  try {
    const sequences = sequence.split('')
    for (const sequence of sequences) {
      switch (sequence) {
        case '>':
          tokenList.setActiveTokenToNext()
          break
        case '<':
          tokenList.setActiveTokenToPrevious()
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
