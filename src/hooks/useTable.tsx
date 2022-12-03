import { useCallback } from "react";
import { Column } from "../pages/players/PlayersTable";

export interface useTableProps<T> {
  columns: Column<T>[];
  data: T[];
}
export const useTable = <T,>(props: useTableProps<T>) => {
  const getHeaderColumns = useCallback(
    () => (
      <tr>
        {props.columns.map((col, idx) => (
          <th key={idx}>{col.label}</th>
        ))}
      </tr>
    ),
    [props.columns]
  );

  const getDataRows = useCallback(
    () => (
      <>
        {props.data.map((d, didx) => (
          <tr key={didx}>
            {props.columns
              .filter((col) => Object.keys(d).includes(col.accessor as string))
              .map((col, colidx) =>
                col.key ? (
                  <>
                    <th key={colidx}>
                      <col.cell value={d[col.accessor]} />
                    </th>
                  </>
                ) : (
                  <td key={colidx}>
                    <col.cell value={d[col.accessor]} />
                  </td>
                )
              )}
          </tr>
        ))}
      </>
    ),
    [props.columns, props.data]
  );

  return {
    getHeaderColumns,
    getDataRows,
  };
};
