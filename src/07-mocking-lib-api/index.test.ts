import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const createAxiosSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('');
    jest.runAllTimers();
    expect(createAxiosSpy).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const getAxiosSpy = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(() =>
        Promise.resolve({ status: 200, data: 'fake-data' }),
      );
    await throttledGetDataFromApi('some-relative-path');
    jest.runAllTimers();
    expect(getAxiosSpy).toBeCalledWith('some-relative-path');
  });

  test('should return response data', async () => {
    axios.create = jest.fn().mockImplementation(() => ({
      get: () => Promise.resolve({ status: 200, data: 'fake-data' }),
    }));
    const data = await throttledGetDataFromApi('some-relative-path');
    jest.runAllTimers();
    expect(data).toBe('fake-data');
  });
});
