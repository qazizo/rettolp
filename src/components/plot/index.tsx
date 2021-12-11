import {
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import getRandomDarkColor from '../../utils/generateDarkColor';

type PlotProps = {
  data: Record<string, string | number>[];
  dimension: string;
  measures: string[];
};

export default function Plot({data, dimension, measures}: PlotProps) {
  return (
    <ResponsiveContainer width="100%" height="80%">
      <LineChart data={data} margin={{top: 0, bottom: 20, right: 20, left: 10}}>
        <XAxis dataKey={dimension} padding={{left: 40, right: 40}}>
          <Label
            value={dimension}
            stroke="#999"
            position="insideBottom"
            offset={-15}
          />
        </XAxis>
        <YAxis
          tickFormatter={(value) =>
            Intl.NumberFormat('en', {notation: 'compact'}).format(value)
          }
          padding={{bottom: 40, top: 40}}>
          <Label
            value={measures.join(' & ')}
            stroke="#999"
            position="insideBottomLeft"
            offset={10}
            angle={-90}
          />
        </YAxis>
        {measures.map((measure) => {
          const color = getRandomDarkColor();
          return (
            <Line
              dataKey={measure}
              stroke={color}
              strokeWidth="2"
              dot={{fill: color, r: 4}}
              key={measure}
            />
          );
        })}
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}
