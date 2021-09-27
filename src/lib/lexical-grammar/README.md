
# Lexical Grammar

## Create a new Lexical Grammar

When creating a new ```LexicalGrammar``` type object, pass the filename of the grammar to be used (located in ```types``` folder) as the parameter.
The passed name of the file must match when instantiating a new ```LexicalGrammar``` object.  

Example (for ```WordAndDotGrammar.json```):  
```const wordAndDotGrammar = new LexicalGrammar('WordAndDotGrammar')```  
or with ENUM:  
```const wordAndDotGrammar = new LexicalGrammar(WORD_AND_DOT)```  

## How to create a new grammar

It is recommended to add the file name of the grammar as a ENUM in ```grammar-name.js``` that can be used to pass as an the argument to a new ```LexicalAnalysis`` instantiation.

Create a new ```JSON``` file under ```types``` folder and add following attributes for the grammar:  

**Fields**
All fields are required.

### grammarName
```string```  
Name of of the lexical grammar. Recommended to correspond to the filename.

Example
```
"grammarName": "WordAndDotGrammar"
```

### description
```string```  
A description of the lexical grammar. Should tell what the grammar is used for. 

Example
```
"description": "Grammar type for word and dot."
```

### trim
```boolean```  
If the grammar type should trim the whitespaces or not between each substring and/or before/after the string.

```
"trim": true
```

### delimiter
```string``` (Regexp)  
Regex for the delimiter/seperator that to be used between each substring to be tokenized. 
Should also include single characters to be tokenized. 

Example
```
"delimiter": "\\S(?![\\w|åäöÅÄÖ+])|\\."
```

### tokenTypes
```object```  

Object containing the token types described in Regexp patterns.

```
"tokenTypes": {
  "WORD": "^[\\w|åäöÅÄÖ]+",
  "DOT": "^\\."
}
```

Full example: 
```
{
  "grammarName": "WordAndDotGrammar",
  "description": "Grammar type for word and dot.",
  "trim": true,
  "delimiter": "\\S(?![\\w|åäöÅÄÖ+])|\\.",
  "tokenTypes": {
    "WORD": "^[\\w|åäöÅÄÖ]+",
    "DOT": "^\\."
  }
}
```
