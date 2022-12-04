import { useCallback } from "react";
import { Column } from "../customTable";
import { RowModelBase } from "../models";

export interface useTableProps<T extends RowModelBase> {
  columns: Column<T>[];
  data: T[];
  dispacher?: React.Dispatch<React.SetStateAction<T[]>>;
}

export function useTable<T extends RowModelBase>(props: useTableProps<T>) {
  const { data, dispacher } = props;
  const HeaderLabels = useCallback(
    () => (
      <tr>
        {props.columns.map((col, idx) => (
          <th align={"center"} key={idx}>
            {col.label}
          </th>
        ))}
      </tr>
    ),
    [props.columns]
  );
  const handleDispach = useCallback(
    (valueRows: T, value: T[keyof T], key: keyof T) => {
      if (dispacher) {
        dispacher(
          [
            ...data.filter((d: T) => d["id"] !== valueRows.id),
            {
              ...valueRows,
              [key]: value,
            },
          ].sort((item1, item2) => (item1.id > item2.id ? 1 : -1))
        );
      }
    },
    [data, dispacher]
  );

  const DataRows = useCallback(
    () => (
      <>
        {data.map((d) => (
          <tr key={d["id"]}>
            {props.columns
              .filter((col) => Object.keys(d).includes(col.key as string))
              .map((col, colidx) => (
                <td
                  style={{ borderBottom: "1px solid rgb(224, 224, 224)" }}
                  key={colidx}
                >
                  {props.dispacher && col.editableValueCell ? (
                    <col.editableValueCell
                      rowValue={d}
                      rowKey={col.key}
                      onAccess={col.onCellValueAccess}
                      isEditable={true}
                      onDispach={handleDispach}
                    />
                  ) : (
                    <col.valueCell
                      rowValue={d}
                      rowKey={col.key}
                      onAccess={col.onCellValueAccess}
                    />
                  )}
                </td>
              ))}
          </tr>
        ))}
      </>
    ),
    [data, handleDispach, props.columns, props.dispacher]
  );

  return {
    HeaderLabels,
    DataRows,
  };
}
