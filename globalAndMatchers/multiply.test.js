const multiply = require("./multiply");

test("2 and 5 multiply equal 10", () => {
  expect(multiply(2, 5)).toBe(10); // Exact equality
});

test("Object equality", () => {
  const data = { alpha: "A" };
  data["beta"] = "B";
  expect(data).toEqual({ alpha: "A", beta: "B" }); // Deep equality
});

test("Null values", () => {
  const value = null;
  expect(value).toBeNull();
  expect(value).toBeDefined();
  expect(value).not.toBeUndefined();
  expect(value).not.toBeTruthy();
  expect(value).toBeFalsy();
});

test("Zero values", () => {
  const value = 0;
  expect(value).not.toBeNull();
  expect(value).toBeDefined();
  expect(value).not.toBeUndefined();
  expect(value).not.toBeTruthy();
  expect(value).toBeFalsy();
});

test("Number comparisons", () => {
  const value = 3 + 3;
  expect(value).toBeGreaterThan(5);
  expect(value).toBeGreaterThanOrEqual(6);
  expect(value).toBeLessThan(7);
  expect(value).toBeLessThanOrEqual(6);
  expect(value).toBe(6);
  expect(value).toEqual(6);
});

test("Floating point numbers", () => {
  const value = 0.2 + 0.1;
  expect(value).toBeCloseTo(0.3, 5); // Precision of 5 decimal places
});

test("String matchers", () => {
  expect("developer").not.toMatch(/I/);
  expect("programming").toMatch(/gram/);
});

test("Array and iterable matchers", () => {
  const todoList = [
    "buy groceries",
    "clean room",
    "pay bills",
    "call mom",
    "finish project",
  ];
  expect(todoList).toContain("pay bills");
  expect(new Set(todoList)).toContain("pay bills");
});

test("Exception matchers", () => {
  function openInvalidFile() {
    throw new Error("file not found");
  }
  expect(() => openInvalidFile()).toThrow();
  expect(() => openInvalidFile()).toThrow(Error);
  expect(() => openInvalidFile()).toThrow("file not found");
  expect(() => openInvalidFile()).toThrow(/not found/);
});

test("drinks returns", () => {
  const drink = jest.fn(() => true);
  drink();
  expect(drink).toHaveReturned();
});
