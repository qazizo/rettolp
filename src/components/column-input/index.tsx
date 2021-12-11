import styles from './style.module.css';

type ColumnInputProps = {
  type: string;
  value?: string;
  onAdd: (column: string) => void;
  onClear: () => void;
};

export default function ColumnInput({
  type,
  value,
  onAdd,
  onClear,
}: ColumnInputProps) {
  return (
    <div
      className={styles.input}
      onDragOver={(e) => {
        e.preventDefault();
        if (e.dataTransfer.types[0] !== type)
          e.dataTransfer.dropEffect = 'none';
      }}
      onDrop={(e) => {
        e.preventDefault();
        const column = e.dataTransfer.getData(type);
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
