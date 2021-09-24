# Tokenizer
A module that performs a lexical analysis for a given string and grammar.  
An assignment for the course 1DV610 Introduction to software quality at Linnaeus University.  

## How to use

1. Create a new grammar type object for the grammar to be used for lexical analysis.
2. Create a new lexical analysis.

### Modules for usage
```
```

Example:
```
// Import the needed modules.
import GrammaticType from '../src/lib/types/GrammarType.js'
import GRAMMAR from '../src/lib/types/grammar.js'
import Tokenizer from '../src/bin/tokenizer/tokenizer.js'

// Import ENUM for the grammar type (optional)
const { ARITHMETIC } = GRAMMAR

// Instantiate a new object for the grammar type to be used.
const testGrammar = new GrammaticType(ARITHMETIC)

// Create a new lexical analysis.
const aritmeticTokenizer = new Tokenizer(testGrammar, '32.2+4-2')

getActiveToken() // 32.2

aritmeticTokenizer.setActiveTokenToNext()
getActiveToken() // +

```

## ⛩️ Constructor 
### constructor(GRAMMAR, string)
Parameters: 
- {object} GRAMMAR: The type of tokenization. Enums
- {string} string: The string to be tokenized.

## 🔧 Public methods

### getActiveToken()
Returns the currently active token in the Lexical Grammar.

### setActiveTokenToPrevious()
Sets the pointer of the current token to the previous one in the lexical grammar.
Throws error if first token has been reached. 

### setActiveTokenToNext()
Sets the pointer of the current token to the next one in the lexical grammar.
Throws error if END token has been reached. 

## Add your own grammar

## 🚀 Built with: 
- JavaScript (ES6)
- Node.js

🧪 Tested with:
- Jest

✍️ Coding standard:
- @lnu/eslint-config

## Notes: 
- This Tokenizer will not handle whitespaces

## Classes

### TokenizedSubString
Creates a new object representing a token of a substring. 

Constructor parameters: 
- {string} tokenMatch The index of token.
- {string} tokenType The tokenType.
- {string} value The subString.
