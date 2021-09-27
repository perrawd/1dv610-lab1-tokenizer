/**
 * Module for sequenceOperator.
 *
 * @author Per Rawdin <per.rawdin@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Operates and calls sequences of a Lexical Analysis.
 *
 * @param {object} lexicalAnalysis The lexical analysis.
 * @param {string} sequences The sequence.
 */
const sequenceOperator = (lexicalAnalysis, sequences) => {
  try {
    const sequenceList = sequences.split('')
    for (const sequence of sequenceList) {
      switch (sequence) {
        case '>':
          lexicalAnalysis.setActiveTokenToNext()
          break
        case '<':
          lexicalAnalysis.setActiveTokenToPrevious()
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
