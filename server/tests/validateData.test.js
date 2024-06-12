const validateData = require("../utils/validateData");

describe("validate API data", () => {
  test("should return false if the value is NaN", () => {
    expect(validateData("TIDE", undefined)).toBe(false);
  });

  test("should return false if the year is not an integer", () => {
    expect(validateData("AAR", "2019.1234")).toBe(false);
  });

  test("should return false if the year is out of range", () => {
    expect(validateData("AAR", "1999")).toBe(false);
  });

  test("should return false if the month is out of range", () => {
    expect(validateData("MND", "14")).toBe(false);
  });

  test("should return false if the day is out of range", () => {
    expect(validateData("DAG", "32")).toBe(false);
  });

  test("should return true if the year is in range", () => {
    expect(validateData("AAR", "2024")).toBe(true);
  });

  test("should return true if the tidal info is recorded as a number", () => {
    expect(validateData("TOTAL", "0.05")).toBe(true);
  });
});
