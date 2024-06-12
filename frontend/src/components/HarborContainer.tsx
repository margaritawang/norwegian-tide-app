import { useContext } from "react";
import { TidalWaterContext, HarborType } from "../contexts/TidalWaterContext";
import { Button, Box, Select, Flex, Spacer, Text } from "@chakra-ui/react";
import { harbors } from "../utils/constants";
import { capitalize } from "../utils/capitalize";
import { ChartArea } from "./ChartArea";
import { MapView } from "./MapView";

type HarborContainerProps = {
  harbor: HarborType;
  index: number;
};

export const HarborContainer = ({ index, harbor }: HarborContainerProps) => {
  const { selectedHarbors, handleUpdate, handleRemove } =
    useContext(TidalWaterContext);
  console.log(process.env.NODE_ENV);
  return (
    <Box
      h="350px"
      borderWidth={1}
      borderRadius="md"
      p={6}
      data-testid={`harborContainer-${index + 1}`}
    >
      <Flex mb={4} position="relative">
        <Select
          placeholder="Select a harbor"
          width="300px"
          value={harbor}
          onChange={(e) => handleUpdate(index, e.target.value as HarborType)}
          data-testid="harborDropdown"
        >
          {Object.keys(harbors).map((harbor) => (
            <option key={harbor} value={harbor}>
              {capitalize(harbor)}
            </option>
          ))}
        </Select>
        <Text></Text>
        <Spacer />
        {selectedHarbors.length > 1 && (
          <Button colorScheme="red" onClick={() => handleRemove(index)}>
            Remove
          </Button>
        )}
        {harbor && <MapView name={harbor} coordinates={harbors[harbor]} />}
      </Flex>
      {harbor && <ChartArea harbor={harbor} />}
    </Box>
  );
};
