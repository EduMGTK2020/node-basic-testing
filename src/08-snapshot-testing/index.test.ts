import { generateLinkedList } from './index';

const values1 = [1, 'Node 2'];
const values2 = [1, 'Node 2', 'Node 3'];

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const linkedList = generateLinkedList(values1);
    const expectedLinkedList = {
      value: 1,
      next: {
        value: 'Node 2',
        next: {
          value: null,
          next: null,
        },
      },
    };
    expect(linkedList).toStrictEqual(expectedLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList(values2);
    expect(linkedList).toMatchSnapshot();
  });
});
