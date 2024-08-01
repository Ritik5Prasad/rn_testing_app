const { addToArray, removeFromArray, arrayContains } = require("./arrayUtils");

let testArray;

beforeAll(() => {
  console.log("Before all tests: Initialize test array");
  testArray = [];
});

afterAll(() => {
  console.log("After all tests: Clear test array");
  testArray = null;
});

beforeEach(() => {
  console.log("Before each test: Reset test array");
  testArray = [];
});

afterEach(() => {
  console.log("After each test: Log test array");
  console.log(testArray);
});

test("add item to array", () => {
  addToArray(testArray, "apple");
  expect(testArray).toContain("apple");
});

test("remove item from array", () => {
  addToArray(testArray, "banana");
  removeFromArray(testArray, "banana");
  expect(testArray).not.toContain("banana");
});

test("check if array contains item", () => {
  addToArray(testArray, "cherry");
  expect(arrayContains(testArray, "cherry")).toBeTruthy();
});

describe("nested array operations", () => {
  beforeEach(() => {
    console.log("Before each nested test: Add initial items");
    addToArray(testArray, "date");
    addToArray(testArray, "elderberry");
  });

  afterEach(() => {
    console.log("After each nested test: Clear test array");
    testArray = [];
  });

  test("nested test: add item to pre-filled array", () => {
    addToArray(testArray, "fig");
    expect(testArray).toContain("fig");
  });

  test("nested test: remove item from pre-filled array", () => {
    removeFromArray(testArray, "date");
    expect(testArray).not.toContain("date");
  });
});
