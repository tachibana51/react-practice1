import { RowModelBase } from "./models";

export interface Column<T extends RowModelBase> {
  label: string;
  key: keyof T;
  onCellValueAccess: (rowModel: T) => T[keyof T];
  valueCell: React.FC<TableCellProps<T>>;
  editableValueCell?: React.FC<TableCellProps<T>>;
}
export interface BaseTableCellFCProps<T extends RowModelBase> {
  rowValue: T;
  rowKey: keyof T;
  onAccess: (rowModel: T, key: keyof T) => T[keyof T];
}
export interface EditableTableCellFCProps<T extends RowModelBase> {
  isEditable?: boolean;
  onDispach?: (valueRows: T, value: T[keyof T], key: keyof T) => void;
  dispacher?: React.Dispatch<React.SetStateAction<T[]>>;
}
export type TableCellProps<T extends RowModelBase> =
  BaseTableCellFCProps<T> extends EditableTableCellFCProps<T>
    ? BaseTableCellFCProps<T>
    : EditableTableCellFCProps<T> & BaseTableCellFCProps<T>;
//| React.HTMLAttributes<HTMLDivElement>;

//export interface TableRow<T> extends Row<T> {}
