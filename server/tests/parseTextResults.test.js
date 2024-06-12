const parseTextResults = require("../utils/parseTextResults");

const MOCK_API_RESPONSE = `
MET - PROGNOSER
    VANNSTANDSVARSEL --- MET STORMFLO ---

    SIST OPPDATERT: 20200330 10:05 UTC
    ==========================================
    BERGEN
    ------------------------------
     AAR MND DAG TIM PROG  SURGE  TIDE   TOTAL  0p     25p    50p    75p    100p
    2020   3  30   0    0  -0.18   0.30   0.12  -0.18  -0.18  -0.18  -0.18  -0.18
    2020   3  30   1    1  -0.20   0.36   0.16  -0.20  -0.20  -0.20  -0.20  -0.19
    2020   3  30   2    2  -0.22   0.31   0.09  -0.22  -0.20  -0.20  -0.20  -0.19
    2020   3  30   3    3  -0.22   0.16  -0.06  -0.23  -0.22  -0.21  -0.21  -0.20
`;

const FORMATTED_RESPONSE = [
  {
    AAR: 2020,
    MND: 3,
    DAG: 30,
    TIM: 0,
    PROG: 0,
    SURGE: -0.18,
    TIDE: 0.3,
    TOTAL: 0.12,
    "0p": -0.18,
    "25p": -0.18,
    "50p": -0.18,
    "75p": -0.18,
    "100p": -0.18,
  },
  {
    AAR: 2020,
    MND: 3,
    DAG: 30,
    TIM: 1,
    PROG: 1,
    SURGE: -0.2,
    TIDE: 0.36,
    TOTAL: 0.16,
    "0p": -0.2,
    "25p": -0.2,
    "50p": -0.2,
    "75p": -0.2,
    "100p": -0.19,
  },
  {
    AAR: 2020,
    MND: 3,
    DAG: 30,
    TIM: 2,
    PROG: 2,
    SURGE: -0.22,
    TIDE: 0.31,
    TOTAL: 0.09,
    "0p": -0.22,
    "25p": -0.2,
    "50p": -0.2,
    "75p": -0.2,
    "100p": -0.19,
  },
  {
    AAR: 2020,
    MND: 3,
    DAG: 30,
    TIM: 3,
    PROG: 3,
    SURGE: -0.22,
    TIDE: 0.16,
    TOTAL: -0.06,
    "0p": -0.23,
    "25p": -0.22,
    "50p": -0.21,
    "75p": -0.21,
    "100p": -0.2,
  },
];

describe("text result parsing", () => {
  test("should return false if the data string doesn't split by dotted lines", () => {
    expect(parseTextResults("12345")).toBe(false);
  });

  test("it should return the correct table with time and tidal info", () => {
    expect(parseTextResults(MOCK_API_RESPONSE)).toStrictEqual(
      FORMATTED_RESPONSE
    );
  });
});
