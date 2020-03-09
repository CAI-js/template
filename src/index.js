const { evaluate } = require('@caijs/eval');

const dictionary = {};

function processString(str, context) {
  if (dictionary[str] === undefined) {
    dictionary[str] = str.match(/{{\s*([^}]+)\s*}}/g) || [];
  }
  const matches = dictionary[str];
  return matches.reduce((p, c) => {
    const solution = evaluate(c.substr(2, c.length - 4), context);
    return solution ? p.replace(c, solution) : p;
  }, str);
}

function process(obj, context) {
  if (typeof obj === 'string') {
    return processString(obj, context);
  }
  if (Array.isArray(obj)) {
    return obj.map(x => process(x, context));
  }
  if (typeof obj === 'object') {
    const keys = Object.keys(obj);
    const result = {};
    for (let i = 0; i < keys.length; i += 1) {
      result[keys[i]] = process(obj[keys[i]], context);
    }
    return result;
  }
  return obj;
}

function templateCompile(str) {
  return (context = {}) => {
    return process(str, context);
  };
}

module.exports = {
  info: { name: 'template' },
  templateCompile,
  compile: (str, context) => templateCompile(str)(context),
};
