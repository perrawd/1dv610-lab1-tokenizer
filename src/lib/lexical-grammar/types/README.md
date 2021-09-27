
## Create a new Lexical Grammar

All fields are required.

When creating a new grammar type object, 
The name of the file must match the when instantiating a new ```LexicalGrammar``` object.  

It is strongly recommended to add the file name of the lexical grammar as a ENUM in the ```grammar-type.js```.

## Fields

### grammarName
name of of the lexical grammar. 

Example
```
"grammarName": "WordAndDotGrammar"
```

### description
A description of the lexical grammar. Should tell what the grammar is used for. 

Example
```
"description": "Grammar type for word and dot."
```

### trim
A boolean. Should tell if the grammar type should trim the whitespaces or not between each substring and/or before/after the string.
```
"trim": true
```

### delimiter
Regex. Regex for the delimiter/seperator that to be used between each substring to be tokenized. 
Should also include single characters to be tokenized. 
Example
```
"delimiter": "\\S(?![\\w|åäöÅÄÖ+])|\\."
```

### tokenTypes
```
{
  "tokenTypes": {
    "WORD": "^[\\w|åäöÅÄÖ]+",
    "DOT": "^\\."
  }
}
```