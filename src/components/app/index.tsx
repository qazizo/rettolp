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

async function fetchData(dimension: string, measures: string[]) {
  const response = await fetch('https://plotter-task.herokuapp.com/data', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({dimension, measures}),
  });
  const data = await response.json();
  return data as Data;
}

export default function App() {
  const [columns, setColumns] = useState<Column[]>();
  const [selectedDimension, setSelectedDimension] = useState<string>();
  const [selectedMeasures, setSelectedMeasures] = useState<string[]>([]);
  const [data, setData] = useState<Data>();
  const [error, setError] = useState<Error>();

  const usedColumns = selectedMeasures.concat(selectedDimension || []);

  useEffect(() => {
    fetchColumns().then(setColumns).catch(setError);
  }, []);

  useEffect(() => {
    if (selectedDimension && selectedMeasures) {
      fetchData(selectedDimension, selectedMeasures)
        .then(setData)
        .catch(setError);
    } else {
      setData(undefined);
    }
  }, [selectedDimension, selectedMeasures]);

  return (
    <div className={styles.container}>
      <div>
        {columns ? (
          <ColumnsList columns={columns} usedColumns={usedColumns} />
        ) : (
          error && <ErrorLine message={error.message} />
        )}
      </div>

      <div>
        <div className={styles.inputs}>
          <label>Dimension</label>
          <ColumnInput
            type="dimension"
            value={selectedDimension}
            onAdd={(column) => setSelectedDimension(column)}
            onClear={() => setSelectedDimension(undefined)}
          />
          <label>Measures</label>
          <ColumnInput
            type="measure"
            value={selectedMeasures}
            onAdd={(column) =>
              setSelectedMeasures([...selectedMeasures, column])
            }
            onClear={() => setSelectedMeasures([])}
          />
        </div>

        {selectedDimension && selectedMeasures && data ? (
          <Plot
            data={transformDataIntoPlotPoints(data)}
            dimension={selectedDimension}
            measures={selectedMeasures}
          />
        ) : (
          error && <ErrorLine message={error.message} />
        )}
      </div>
    </div>
  );
}

function ErrorLine({message}: {message: string}) {
  return <span style={{color: 'red'}}>Error: {message}</span>;
}

function transformDataIntoPlotPoints(data: Data) {
  return data[0].values.map((_, index) =>
    data.reduce<Record<string, string | number>>((point, element) => {
      point[element.name] = element.values[index];
      return point;
    }, {})
  );
}
