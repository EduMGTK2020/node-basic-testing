import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const linkedList = generateLinkedList([1, 'Node 2', 'Node 3']);
    const expectedLinkedList = {
      value: 1,
      next: {
        value: 'Node 2',
        next: {
          value: 'Node 3',
          next: {
            value: null,
            next: null,
          },
        },
      },
    };
    expect(linkedList).toStrictEqual(expectedLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList([1, 'Node 2', 'Node 3']);
    expect(linkedList).toMatchSnapshot();
  });
});
