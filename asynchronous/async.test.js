const fetchData = require("./fetchData");

test("the data is chocolate using promises", () => {
  return fetchData().then((data) => {
    expect(data).toBe("chocolate");
  });
});

test("the data is chocolate using async/await", async () => {
  const data = await fetchData();
  expect(data).toBe("chocolate");
});

test("fetch fails with an error using async/await", async () => {
  expect.assertions(1);
  try {
    await fetchData(true);
  } catch (error) {
    expect(error).toMatch("error occurred");
  }
});

test("the data is chocolate using resolves matcher", async () => {
  await expect(fetchData()).resolves.toBe("chocolate");
});

test("fetch fails with an error using rejects matcher", async () => {
  await expect(fetchData(true)).rejects.toMatch("error occurred");
});

test("fetch fails with an error using promises and .catch",async () => {
  expect.assertions(1);
  return fetchData(true).catch((error) => {
    expect(error).toMatch("error occurred");
  });
});


// test.only for ruunning only one test

// test.only("fetch fails with an error using promises and .catch",async () => {
//     expect.assertions(1);
//     return fetchData(true).catch((error) => {
//       expect(error).toMatch("error occurred");
//     });
//   });