import { Button, Input } from "@mui/material";
import React, { useMemo } from "react";
import { useTable } from "../../hooks/useTable";
import { Player } from "../../model/models";

export interface TableCellFCProps<T> {
  value?: T[keyof T];
  isEditable?: boolean;
}
export type TableCellProps<T> = TableCellFCProps<T>;

export interface Column<T> {
  label: string;
  header?: string;
  accessor: keyof T;
  key?: keyof T;
  cell: (props: TableCellProps<T>) => JSX.Element;
}

const dummy: Player[] = [
  { id: 1, name: "ff", memo: "" },
  { id: 2, name: "bb", memo: "f" },
];
//export interface TableRow<T> extends Row<T> {}

const TableCell: <T>(props: TableCellProps<T>) => JSX.Element = ({
  ...props
}) => {
  //return <TextField defaultValue={`${props.value}`} />;
  //return <input> {`${props.value}`} </input>;
  return (
    <Input
      type="text"
      defaultValue={`${props.value}`}
      disabled={!props.isEditable}
    />
  );
};

export const PlayersTable: React.FC<{}> = ({}) => {
  const playersColumns = useMemo<Column<Player>[]>(
    () => [
      {
        label: "名前",
        cell: (cell: TableCellProps<Player>) => (
          <TableCell<Player> value={cell.value} isEditable={false} />
        ),
        accessor: "name",
        key: "name",
      },
      {
        label: "memo",
        cell: (cell: TableCellProps<Player>) => (
          <TableCell<Player> value={cell.value} isEditable={true} />
        ),
        accessor: "memo",
      },
    ],
    []
  );
  const { getDataRows, getHeaderColumns } = useTable({
    data: dummy,
    columns: playersColumns,
  });
  return (
    <React.Fragment>
      <table>
        <thead>{getHeaderColumns()}</thead>
        <tbody>{getDataRows()}</tbody>
      </table>
      <br />
      <Button variant="outlined">追加</Button>
    </React.Fragment>
  );
};
