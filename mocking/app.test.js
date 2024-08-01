// app.test.js
jest.mock('./mathUtils'); // Automatically use the mocks from __mocks__/mathUtils.js

const { calculate } = require('./app');
const { add, subtract, multiply, divide } = require('./mathUtils');

describe('calculate', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
  });

  test('calls add with correct arguments', () => {
    calculate(1, 2, 'add');
    expect(add).toHaveBeenCalled();
    expect(add).toHaveBeenCalledWith(1, 2);
  });

  test('calls subtract with correct arguments', () => {
    calculate(5, 3, 'subtract');
    expect(subtract).toHaveBeenCalled();
    expect(subtract).toHaveBeenCalledWith(5, 3);
  });

  test('calls multiply with correct arguments', () => {
    calculate(2, 4, 'multiply');
    expect(multiply).toHaveBeenCalled();
    expect(multiply).toHaveBeenCalledWith(2, 4);
  });

  test('calls divide with correct arguments', () => {
    calculate(10, 2, 'divide');
    expect(divide).toHaveBeenCalled();
    expect(divide).toHaveBeenCalledWith(10, 2);
  });

//   test('throws error for invalid operation', () => {
//     expect(() => calculate(1, 2, 'invalid')).toThrow('Invalid operation');
//   });

//   test('throws error for divide by zero', () => {
//     expect(() => calculate(1, 0, 'divide')).toThrow('Cannot divide by zero');
//   });
});
