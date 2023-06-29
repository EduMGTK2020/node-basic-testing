// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const spySetTimeout = jest.spyOn(global, 'setTimeout');
    const callBackFuction = jest.fn();

    doStuffByTimeout(callBackFuction, 1000);
    expect(spySetTimeout).toHaveBeenCalledTimes(1);

    jest.runAllTimers();
    expect(callBackFuction).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const callBackFuction = jest.fn();

    doStuffByTimeout(callBackFuction, 1000);
    expect(callBackFuction).not.toBeCalled();

    jest.runAllTimers();
    expect(callBackFuction).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const spySetInterval = jest.spyOn(global, 'setInterval');
    const callBackFuction = jest.fn();

    doStuffByInterval(callBackFuction, 1000);
    expect(spySetInterval).toHaveBeenCalledTimes(1);

    jest.runOnlyPendingTimers();
    expect(callBackFuction).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callBackFuction = jest.fn();

    doStuffByInterval(callBackFuction, 1000);
    expect(callBackFuction).not.toBeCalled();

    jest.advanceTimersByTime(3500);
    expect(callBackFuction).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spyJoin = jest.spyOn(path, 'join');
    const fileName = 'file.name';
    await readFileAsynchronously(fileName);
    expect(spyJoin).toBeCalledWith(__dirname, fileName);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    expect(await readFileAsynchronously('')).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'File content';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest
      .spyOn(fs.promises, 'readFile')
      .mockReturnValue(Promise.resolve(fileContent));
    expect(await readFileAsynchronously('')).toBe(fileContent);
  });
});
