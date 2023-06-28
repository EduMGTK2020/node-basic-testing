import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

import lodash from 'lodash';

const initialAmount = 10;
const operationAmount = 100;
const bankAccount = getBankAccount(initialAmount);
const bankAccountTo = getBankAccount(0);

describe('BankAccount', () => {
  afterAll(() => {
    jest.unmock('lodash');
  });

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(initialAmount);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(operationAmount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => bankAccount.transfer(operationAmount, bankAccountTo)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(operationAmount, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(0);
    expect(bankAccount.deposit(operationAmount).getBalance()).toBe(
      operationAmount,
    );
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(operationAmount);
    expect(bankAccount.withdraw(operationAmount).getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    expect(
      bankAccount.transfer(initialAmount, bankAccountTo).getBalance(),
    ).toBe(0);
    expect(bankAccountTo.getBalance()).toBe(initialAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    lodash.random = jest.fn(() => 1);
    const amount = await bankAccount.fetchBalance();
    expect(typeof amount).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    lodash.random = jest.fn(() => 1);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(1);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    lodash.random = jest.fn(() => 0);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
