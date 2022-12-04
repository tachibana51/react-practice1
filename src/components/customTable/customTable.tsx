import { RowModelBase } from "./models";

export interface Column<T extends RowModelBase> {
  label: string;
  key: keyof T;
  onCellValueAccess: (rowModel: T) => string | number;
  cell: React.FC<TableCellProps<T>>;
}
export interface TableCellFCProps<T extends RowModelBase> {
  rowData: string | number;
  onChange?: React.Dispatch<React.SetStateAction<T>>;
  isEditable?: boolean;
}
export type TableCellProps<T extends RowModelBase> = TableCellFCProps<T>;
//| React.HTMLAttributes<HTMLDivElement>;

//export interface TableRow<T> extends Row<T> {}
