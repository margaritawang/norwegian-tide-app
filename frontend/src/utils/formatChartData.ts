import { TidalData } from "../api/types/TidalData";

export const formatChartData = (rawData: TidalData[]) =>
  rawData.map((data) => ({
    tide: data.TIDE,
    surge: data.SURGE,
    total: data.TOTAL,
    dateTime: `${data.AAR}-${data.MND}-${data.DAG} ${data.TIM}:00`,
  }));
