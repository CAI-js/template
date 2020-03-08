# @caijs/template

@caijs/template allow to use variables or code between double brackets, and be evaluated with a context to generate a new string

## Installation

In your project folder run:

```bash
$ npm install @caijs/template
```

## Examples of use

You can evaluate an string

```javascript
const { compile } = require('@caijs/template');

const source = 'My name is {{ name }}, my age is {{ age }}';
const data = { name: 'Ana', age: 30 };
const result = compile(source, data);
console.log(result); // My name is Ana, my age is 30
```

You can use invoke functions inside the brackets:

```javascript
const { compile } = require('@caijs/template');

const source = 'First value is {{ values[0] }}. Mean of data is {{ mean(values) }}';
const data = { 
  values: [1, 6, 3, 2, 1],
  mean: arr => arr.reduce((p, c) => p + c, 0) / arr.length
};
const result = compile(source, data);
console.log(result); // First value is 1. Mean of data is 2.6
```