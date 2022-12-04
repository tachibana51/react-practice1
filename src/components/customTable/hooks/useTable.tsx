import { useCallback } from "react";
import { Column } from "../customTable";
import { RowModelBase } from "../models";

export interface useTableProps<T extends RowModelBase> {
  columns: Column<T>[];
  data: T[];
}

export function useTable<T>(props: useTableProps<T & RowModelBase>) {
  const HeaderLabels = useCallback(
    () => (
      <tr>
        {props.columns.map((col, idx) => (
          <th key={idx}>{col.label}</th>
        ))}
      </tr>
    ),
    [props.columns]
  );

  const DataRows = useCallback(
    () => (
      <>
        {props.data.map((d, didx) => (
          <tr key={didx}>
            {props.columns
              .filter((col) => Object.keys(d).includes(col.key as string))
              .map((col, colidx) => (
                <td key={colidx}>
                  <col.cell rowData={col.onCellValueAccess(d)} />
                </td>
              ))}
          </tr>
        ))}
      </>
    ),
    [props.columns, props.data]
  );

  return {
    HeaderLabels,
    DataRows,
  };
}
