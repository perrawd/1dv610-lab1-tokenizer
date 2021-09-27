// Import modules.
import GrammaticType from '../src/lib/lexical-grammar/lexical-grammar.js'
import GRAMMAR_NAME from '../src/lib/lexical-grammar/grammar-name.js'
import LexicalAnalysis from '../src/lexical-analysis.js'

// Assign grammar type (optional).
const { ARITHMETIC } = GRAMMAR_NAME

// Instantiate a new object for the grammar type to be used.
const arithmeticGrammar = new GrammaticType(ARITHMETIC)

// Create a new lexical analysis.
const aritmeticAnalysis = new LexicalAnalysis(arithmeticGrammar, '38 + 4')

// Get active token
console.log(aritmeticAnalysis.getActiveToken()) // Token { tokenMatch: 0, tokenType: 'NUMBER', value: '38' }

// Set the current active token to next.
aritmeticAnalysis.setActiveTokenToNext()

console.log(aritmeticAnalysis.getActiveToken()) // Token { tokenMatch: 1, tokenType: 'ADD', value: '+' }

// Set the current active token to next (twice).
aritmeticAnalysis.setActiveTokenToNext()
aritmeticAnalysis.setActiveTokenToNext()

console.log(aritmeticAnalysis.getActiveToken()) // Token { tokenMatch: 3, tokenType: 'END', value: 'END' }

// Set the current active token to previous.
aritmeticAnalysis.setActiveTokenToPrevious()

console.log(aritmeticAnalysis.getActiveToken()) // Token { tokenMatch: 2, tokenType: 'NUMBER', value: '4' }

console.table(aritmeticAnalysis.getTokenList()) // Table of token list.
