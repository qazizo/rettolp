import styles from './style.module.css';

type ColumnInputProps = {
  value?: string;
  onAdd: (column: string) => void;
  onClear: () => void;
};

export default function ColumnInput({value, onAdd, onClear}: ColumnInputProps) {
  return (
    <div
      className={styles.input}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const column = e.dataTransfer.getData('text/plain');
        onAdd(column);
      }}>
      {value && (
        <>
          <div>
            <div className={styles.element}>{value}</div>
          </div>
          <button className={styles.clearButton} onClick={onClear}>
            Clear
          </button>
        </>
      )}
    </div>
  );
}
