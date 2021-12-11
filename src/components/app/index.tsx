import {useEffect, useState} from 'react';
import {Column, fetchColumns} from '../../api/columns';
import {Data, fetchData} from '../../api/data';
import {transformDataIntoPlotPoints} from '../../utils/transformDataIntoPlotPoints';
import ColumnInput from '../column-input';
import ColumnsList from '../columns-list';
import Plot from '../plot';
import styles from './style.module.css';

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
