import { formatChartData } from "../utils/formatChartData";

const MOCK_DATA = [
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
];

const MOCK_RESULTS = [
  {
    tide: 0.3,
    surge: -0.18,
    total: 0.12,
    dateTime: "2020-3-30 0:00",
  },
  {
    tide: 0.36,
    surge: -0.2,
    total: 0.16,
    dateTime: "2020-3-30 1:00",
  },
  {
    tide: 0.31,
    surge: -0.22,
    total: 0.09,
    dateTime: "2020-3-30 2:00",
  },
];

describe("formatChartData", () => {
  test("handles empty array", () => {
    const results = formatChartData([]);
    expect(results).toStrictEqual([]);
  });

  test("it should correctly format the data", () => {
    const results = formatChartData(MOCK_DATA);
    expect(results).toStrictEqual(MOCK_RESULTS);
  });
});
