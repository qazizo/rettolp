import {Column} from '../app';
import styles from './style.module.css';

type ColumnsListProps = {columns: Column[]; usedColumns?: string[]};

export default function ColumnsList({columns, usedColumns}: ColumnsListProps) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>Columns</label>
      <ul className={styles.list}>
        {columns.map(({name, function: type}) => (
          <li
            key={name}
            draggable={!usedColumns?.includes(name)}
            onDragStart={(e) => {
              e.dataTransfer.setData(type, name);
            }}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
