import {
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type PlotProps = {
  data: {name: string; value: number}[];
  dimension: string;
  measure: string;
};

export default function Plot({data, dimension, measure}: PlotProps) {
  return (
    <ResponsiveContainer width="100%" height="80%">
      <LineChart data={data} margin={{top: 5, bottom: 5, right: 20, left: 20}}>
        <XAxis dataKey="name" tick={false} padding={{left: 40, right: 40}}>
          <Label value={dimension} stroke="#999" position="insideBottom" />
        </XAxis>
        <YAxis dataKey="value" tick={false} padding={{bottom: 40, top: 40}}>
          <Label
            value={measure}
            stroke="#999"
            position="centerTop"
            angle={-90}
          />
        </YAxis>
        <Line
          dataKey="value"
          stroke="#333"
          strokeWidth="2"
          dot={{fill: '#333', r: 6}}
        />
        <Tooltip formatter={(value: string) => [value, measure]} />
      </LineChart>
    </ResponsiveContainer>
  );
}
