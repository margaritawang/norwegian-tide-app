import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { within } from "@testing-library/dom";
import { Layout } from "../components/Layout";
import {
  TidalWaterContext,
  tidalWaterContextInitialValues,
} from "../contexts/TidalWaterContext.tsx";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      retry: false,
    },
  },
});

export function mockFetch(data: any) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data,
    })
  );
}

const MOCK_JSON = {
  1: { foo: "bar" },
  2: { foo: "bar" },
  3: { foo: "bar" },
};

describe("App layout", () => {
  beforeEach(() => {
    window.fetch = mockFetch(MOCK_JSON);
    render(
      <TidalWaterContext.Provider value={tidalWaterContextInitialValues}>
        <Layout />
      </TidalWaterContext.Provider>
    );
  });

  test("Should render container with all harbors", () => {
    const container = screen.getByTestId("harbors");
    expect(container).toBeInTheDocument();
  });

  test("Add harbor button should be disabled on initial load", () => {
    const button = screen.getByText("Add", { exact: true });
    expect(button).toBeDisabled();
  });

  test("harbor container should exist", () => {
    const container = screen.getByTestId("harbors");
    const dropdown = within(container).queryByTestId("harborDropdown");

    expect(dropdown).toBeInTheDocument();
  });
});

describe("app layout with one harbor selected", () => {
  beforeEach(() => {
    render(
      <TidalWaterContext.Provider
        value={{
          ...tidalWaterContextInitialValues,
          selectedHarbors: ["sandnes"],
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Layout />
        </QueryClientProvider>
      </TidalWaterContext.Provider>
    );
  });

  test("Add harbor button should be enabled on initial load", () => {
    const button = screen.getByText("Add", { exact: true });
    expect(button).toBeEnabled();
  });
});
