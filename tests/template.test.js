const { compile, templateCompile } = require('../src');

describe('Template', () => {
  describe('template compile', () => {
    it('Should return a function', () => {
      const actual = templateCompile(`Hello {{ something }}`);
      expect(actual).toBeInstanceOf(Function);
    });
  });

  describe('execute', () => {
    it('Should return the same string if no variables', () => {
      const answer = templateCompile('Hello')();
      expect(answer).toEqual('Hello');
    });
    it('Should return input if is not string, array or object', () => {
      const answer = templateCompile(7)();
      expect(answer).toEqual(7);
    });
    it('Should replace variables from the context', () => {
      const context = {
        name: 'Jesus',
        a: 43,
      };
      const answer = templateCompile('Hello {{ name }} {{ a }}')(context);
      expect(answer).toEqual('Hello Jesus 43');
    });
    it('Should store strings in dictionary when compiled', () => {
      const context = {
        name: 'Jesus',
        a: 43,
      };
      const answer = templateCompile('Hello {{ name }} {{ a }}')(context);
      expect(answer).toEqual('Hello Jesus 43');
      const answer2 = templateCompile('Hello {{ name }} {{ a }}')(context);
      expect(answer2).toEqual('Hello Jesus 43');
    });
    it('Should be able to call functions of the context', () => {
      const context = {
        name: 'Jesus',
        a: 43,
        double: x => x * 2,
      };
      const answer = templateCompile('Hello {{ name }} {{ double(a) }}')(
        context
      );
      expect(answer).toEqual('Hello Jesus 86');
    });
    it('Should be able to do operations with variables of the context', () => {
      const context = {
        name: 'Jesus',
        a: 43,
        b: 10,
        double: x => x * 2,
      };
      const answer = templateCompile('Hello {{ name }} {{ double(a + b) }}')(
        context
      );
      expect(answer).toEqual('Hello Jesus 106');
    });
    it('Should be able to process arrays', () => {
      const context = {
        name: 'Jesus',
        a: 43,
        b: 10,
        double: x => x * 2,
      };
      const answer = templateCompile([
        'Hello {{ name }}',
        'This is {{ double(a + b) }}',
      ])(context);
      expect(answer).toEqual(['Hello Jesus', 'This is 106']);
    });
    it('Should be able to process objects', () => {
      const context = {
        name: 'Jesus',
        a: 43,
        b: 10,
        double: x => x * 2,
      };
      const obj = {
        name: '{{ name }}',
        nested: {
          id: '{{ double(a+b) }}',
        },
      };
      const answer = templateCompile(obj)(context);
      expect(answer).toEqual({ name: 'Jesus', nested: { id: '106' } });
    });
  });

  describe('compile', () => {
    it('Compile can be used directly instead of templateCompile curry', () => {
      const context = {
        name: 'Jesus',
        a: 43,
        b: 10,
        double: x => x * 2,
      };
      const obj = {
        name: '{{ name }}',
        nested: {
          id: '{{ double(a+b) }}',
        },
      };
      const answer = compile(obj, context);
      expect(answer).toEqual({ name: 'Jesus', nested: { id: '106' } });
    });
  });
});
