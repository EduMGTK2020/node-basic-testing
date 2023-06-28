import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

const testResult = 'Test Result';
const defaultMessage = 'Oops!';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue(testResult);
    expect(result).toBe(testResult);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError(testResult)).toThrow(testResult);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(throwError).toThrow(defaultMessage);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(rejectCustomError).rejects.toThrow(MyAwesomeError);
  });
});
