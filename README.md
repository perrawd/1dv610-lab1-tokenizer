# Tokenizer
A module that performs a lexical analysis for a given string and grammar.  
An assignment for the course 1DV610 Introduction to software quality at Linnaeus University.  

## How to use
new Tokenizer(type, string)

## ⛩️ Constructor 
### constructor(GRAMMAR, string)
Parameters: 
- {string} GRAMMAR: The type of tokenization. Enums
- {string} string: The string to be tokenized.

## 🔧 Public methods

### getActiveToken()
Returns the currently active token in the Lexical Grammar.

### setActiveTokenToPrevious()
Sets the pointer of the current token to previous one in the lexical grammar.
Throws error if first token has been reached. 

### setActiveTokenToNext()
Sets the pointer of the current token to next in the lexical grammar.
Throws error if END token has been reached. 

## Add your own grammar

🚀 Built with: 
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
