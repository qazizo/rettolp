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
      <LineChart data={data} margin={{top: 0, bottom: 20, right: 20, left: 10}}>
        <XAxis dataKey="name" padding={{left: 40, right: 40}}>
          <Label
            value={dimension}
            stroke="#999"
            position="insideBottom"
            offset={-15}
          />
        </XAxis>
        <YAxis
          dataKey="value"
          tickFormatter={(value) =>
            new Intl.NumberFormat('en', {notation: 'compact'}).format(value)
          }
          padding={{bottom: 40, top: 40}}>
          <Label
            value={measure}
            stroke="#999"
            position="insideLeft"
            offset={0}
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
