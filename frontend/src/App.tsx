import "./App.css";
import { Layout } from "./components/Layout.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  TidalWaterContext,
  HarborType,
} from "./contexts/TidalWaterContext.tsx";
import { useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      retry: false,
    },
  },
});

function App() {
  const [selectedHarbors, setSelectedHarbors] = useState<HarborType[]>([""]);
  const [syncViewEnabled, setSyncViewEnabled] = useState(false);

  const handleAdd = () => {
    setSelectedHarbors([...selectedHarbors, ""]);
  };

  const handleRemove = (index: number) => {
    setSelectedHarbors((prevElements) =>
      prevElements.filter((_, i) => i !== index)
    );
  };

  const handleUpdate = (index: number, newValue: HarborType) => {
    setSelectedHarbors((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = newValue;
      return updatedValues;
    });
  };

  return (
    <ChakraProvider>
      <TidalWaterContext.Provider
        value={{
          selectedHarbors,
          setSelectedHarbors,
          syncViewEnabled,
          setSyncViewEnabled,
          handleAdd,
          handleRemove,
          handleUpdate,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Layout />
        </QueryClientProvider>
      </TidalWaterContext.Provider>
    </ChakraProvider>
  );
}

export default App;
