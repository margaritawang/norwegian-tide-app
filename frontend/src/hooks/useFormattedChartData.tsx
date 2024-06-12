import { useMemo } from "react";
import { TidalData } from "../api/types/TidalData";
import { formatChartData } from "../utils/formatChartData";

export const useFormattedChartData = (data: TidalData[], harbor: string) => {
  return useMemo(() => formatChartData(data), [harbor]);
};
