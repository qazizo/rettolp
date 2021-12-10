import {useEffect, useState} from 'react';
import ColumnInput from '../column-input';
import ColumnsList from '../columns-list';
import Plot from '../plot';
import styles from './style.module.css';

export type Column = {name: string; function: 'dimension' | 'measure'};
export type Data = {name: string; values: (string | number)[]}[];

async function fetchColumns() {
  const response = await fetch('https://plotter-task.herokuapp.com/columns');
  const data = await response.json();
  return data as Column[];
}

async function fetchData(dimension: string, measure: string) {
  const response = await fetch('https://plotter-task.herokuapp.com/data', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      dimension,
      measures: [measure],
    }),
  });
  const data = await response.json();
  return data as Data;
}

export default function App() {
  const [columns, setColumns] = useState<Column[]>();
  const [selectedDimension, selectDimension] = useState<string>();
  const [selectedMeasure, selectMeasure] = useState<string>();
  const [data, setData] = useState<Data>();

  useEffect(() => {
    fetchColumns().then(setColumns);
  }, []);

  useEffect(() => {
    if (selectedDimension && selectedMeasure) {
      fetchData(selectedDimension, selectedMeasure).then(setData);
    } else {
      setData(undefined);
    }
  }, [selectedDimension, selectedMeasure]);

  return (
    <div className={styles.container}>
      <div>{columns && <ColumnsList columns={columns} />}</div>

      <div>
        <div className={styles.inputs}>
          <label>Dimension</label>
          <ColumnInput
            value={selectedDimension}
            onAdd={(column) => selectDimension(column)}
            onClear={() => selectDimension(undefined)}
          />
          <label>Measures</label>
          <ColumnInput
            value={selectedMeasure}
            onAdd={(column) => selectMeasure(column)}
            onClear={() => selectMeasure(undefined)}
          />
        </div>

        {selectedDimension && selectedMeasure && data && (
          <Plot
            data={transformDataIntoPlotPoints(data)}
            dimension={selectedDimension}
            measure={selectedMeasure}
          />
        )}
      </div>
    </div>
  );
}

function transformDataIntoPlotPoints(data: Data) {
  return data[0].values.map((name, index) => ({
    name: String(name),
    value: Math.round(Number(data[1].values[index])),
  }));
}
