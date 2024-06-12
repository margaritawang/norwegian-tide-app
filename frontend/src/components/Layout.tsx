import { useContext } from "react";
import {
  Text,
  Box,
  Flex,
  Checkbox,
  Spacer,
  VStack,
  Button,
  Link,
} from "@chakra-ui/react";
import { HarborContainer } from "./HarborContainer";
import { TidalWaterContext } from "../contexts/TidalWaterContext";

export const Layout = () => {
  const { selectedHarbors, handleAdd, syncViewEnabled, setSyncViewEnabled } =
    useContext(TidalWaterContext);

  return (
    <>
      <Text as="h1" textAlign="center">
        Tides of Norway
      </Text>
      <Text my={6}>
        Check the tidal water level forecast for various harbors in Norway! You
        can see weather-adjusted forecasts for the next three days. Simply
        choose a harbor from the dropdown menu or click "Add" to include more
        harbors in your view.
      </Text>
      <Flex dir="row" justify="flex-end" my={2}>
        <Checkbox
          isChecked={syncViewEnabled}
          onChange={(e) => setSyncViewEnabled(e.target.checked)}
        >
          <em>
            Check for a synchronized view across different harbors. (Hover on
            data points in charts to view more details.)
          </em>
        </Checkbox>
        <Spacer />
        <Button
          colorScheme="teal"
          onClick={handleAdd}
          // prevent users from adding more than one blank view
          isDisabled={
            selectedHarbors.length > 2 || selectedHarbors.includes("")
          }
        >
          Add
        </Button>
      </Flex>
      <Box my={6} maxW="full" overflow="hidden" data-testid="harbors">
        <VStack spacing={4} align="stretch">
          {selectedHarbors.map((harbor, index) => (
            <HarborContainer key={index} index={index} harbor={harbor} />
          ))}
        </VStack>
      </Box>
      <Text fontSize="sm">
        This app uses the MET Weather API by MET Norway. For more information,
        visit{" "}
        <Link href="https://api.met.no/" isExternal color="teal.500">
          The MET Weather API
        </Link>
        .
      </Text>
    </>
  );
};
