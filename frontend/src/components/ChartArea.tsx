import { Alert, AlertIcon, Spinner } from "@chakra-ui/react";
import { useTidalWater } from "../api/fetchTidalWater";
import { Chart } from "./Chart";

type ChartAreaProps = {
  harbor: string;
};

export const ChartArea = ({ harbor }: ChartAreaProps) => {
  // Queries
  const { isLoading, isError, data, error } = useTidalWater(harbor);

  if (isLoading)
    return (
      <Spinner
        size="xl"
        thickness="4px"
        emptyColor="gray.200"
        color="blue.500"
      />
    );

  if (isError || error) {
    return (
      <Alert status="error" width="80%">
        <AlertIcon />
        Error loading tidal data, please try again later.
      </Alert>
    );
  }

  if (data) {
    return <Chart data={data.data} harbor={harbor} />;
  }

  return null;
};
