# Tokenizer
A module that performs lexical analysis for tokenizing strings.  
An assignment for the course 1DV610 Introduction to software quality at Linnaeus University.  

## ⛩️ Constructor 
### constructor(type, string)
Parameters: 
- {string} type: The type of tokenization.
- {string} string: The string to be tokenized.

Attributes:
- {string} type: The type of tokenization.
- {string} string: The string to be tokenized.
- {array} tokenizedString: An array of objects with the tokens.

## 🔧 Methods
### tokenize()
Tokenizes a string and returns an array of objects with the attributes: 
- tokenMatch
- tokenType
- value

Returns: Array of objects.

### moveCurrentTokenTo()
Sets the pointer of the current token to either previous or next in the lexical grammar.
Throws error if invalid direction argument is provided. 

Parameters: 
- {string} previous: The previous token.
- {string} next: The next token.

### printTable(input)
Prints a table of the tokenized string. 

🚀 Built with: 
- JavaScript (ES6)
- Node.js

🧪 Tested with:
- Jest

✍️ Coding standard:
- @lnu/eslint-config
