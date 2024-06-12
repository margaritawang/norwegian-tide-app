export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
    // process `*.tsx` files with `ts-jest`
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(ol|labelgun|mapbox-to-ol-style|ol-mapbox-style)/).*/",
  ],
  coveragePathIgnorePatterns: ["/node_modules/", "env-setup.js"],
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__ mocks __/fileMock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
