import "./App.css";
import { Layout } from "./components/Layout.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { TidalWaterContext } from "./contexts/TidalWaterContext.tsx";
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
  const [selectedHarbors, setSelectedHarbors] = useState<string[]>([""]);
  const [syncViewEnabled, setSyncViewEnabled] = useState(false);

  const handleAdd = () => {
    setSelectedHarbors([...selectedHarbors, ""]);
  };

  const handleRemove = (index: number) => {
    setSelectedHarbors((prevElements) =>
      prevElements.filter((_, i) => i !== index)
    );
  };

  const handleUpdate = (index: number, newValue: string) => {
    setSelectedHarbors((prevValues) => {
      const updatedValues = [...prevValues]; // Create a copy of the current state
      updatedValues[index] = newValue; // Update the value at the specified index
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
