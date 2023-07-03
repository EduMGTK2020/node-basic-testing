import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 5, b: 4, action: Action.Subtract, expected: 1 },
  { a: 6, b: 7, action: Action.Multiply, expected: 42 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 8, b: 2, action: Action.Exponentiate, expected: 64 },
  { a: 8, b: 2, action: 'Divide', expected: null },
  { a: '8', b: 2, action: Action.Divide, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    `Table test - case: %s`,
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
