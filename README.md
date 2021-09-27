# Lexical Analysis
A module that performs a lexical analysis for a given string with a lexical grammar.  

## 🔨 How to use

1. Instantiate a new lexical grammar object for the grammar to be used for lexical analysis. [Read more](./src/lib/lexical-grammar/README.md)  
2. Instantiate a new LexicalAnalysis object with a lexical grammar type and the string that is to be analysed.

Example:
```
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

```

## 🧰 Public methods

### getActiveToken()
Returns the currently active token.

### setActiveTokenToPrevious()
Sets the pointer of the current token to the previous one in the token list.  
Throws error if first token has been reached. 

### setActiveTokenToNext()
Sets the pointer of the current token to the next one in the token list.  
Creates the next token if needed.  
Throws error if END token has been reached. 

### getTokenList()
Returns an array of the created tokens.

## ✏️ Add your own grammar
[Read more](./src/lib/lexical-grammar/README.md)

## ⛩️ Classes

### LexicalAnalysis
Instantiate a new ```LexicalAnalysis``` object. 

Constructor arguments: 
- {LexicalGrammar} ```LexicalGrammar``` The lexical grammar to be used.  
- {string} The string to be analysed/tokenized.

### LexicalGrammar
Instantiate a new ```LexicalGrammar``` object. 

Constructor arguments: 
- {string} ```GRAMMAR_NAME``` name of the grammar to be used.

### Token
Used by ```LexicalAnalysis```.
Instantiate a new ```Token``` object. 

Constructor arguments: 
- {string} ```tokenMatch``` The index of token.  
- {string} ```tokenType``` The tokenType.  
- {string} ```value``` The subString.  

## 🚀 Built with: 
- JavaScript (ES6)
- Node.js

🧪 Tested with:
- Jest

✍️ Coding standard:
- @lnu/eslint-config
