import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useFormattedChartData } from "../hooks/useFormattedChartData";
import { TidalData } from "../api/types/TidalData";
import { TidalWaterContext } from "../contexts/TidalWaterContext";
import { useContext } from "react";

type ChartProps = {
  harbor: string;
  data: TidalData[];
};

export const Chart = ({ data, harbor }: ChartProps) => {
  const formattedData = useFormattedChartData(data, harbor);
  const { syncViewEnabled } = useContext(TidalWaterContext);
  return (
    <ResponsiveContainer width="80%" height="80%">
      <ComposedChart
        width={500}
        height={200}
        data={formattedData}
        margin={{
          top: 5,
          right: 30,
          left: 0,
          bottom: 5,
        }}
        syncId={syncViewEnabled ? "syncId" : undefined}
      >
        <XAxis dataKey="dateTime" />
        <YAxis />
        <Tooltip />
        <Legend
          align="right"
          verticalAlign="top"
          iconSize={12}
          iconType="plainline"
        />
        <Line
          type="monotone"
          dataKey="surge"
          stroke="#8884d8"
          dot={{ r: 2 }}
          animationDuration={500}
        />
        <Line
          type="monotone"
          dataKey="tide"
          stroke="#82ca9d"
          strokeWidth={2}
          dot={{ r: 2 }}
          animationDuration={500}
        />
        <Line
          type="monotone"
          dataKey="total"
          stroke="#ffc658"
          animationDuration={500}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
