import { Button, Input } from "@mui/material";
import React, { useMemo } from "react";
import {
  Column,
  TableCellProps,
} from "../../components/customTable/customTable";
import { useTable } from "../../components/customTable/hooks/useTable";
import { Player } from "../../model/player";

const PlayerInputCell: React.FC<TableCellProps<any>> = ({ ...props }) => {
  return <Input type="text" value={props.rowData} />;
};

export const PlayersTable: React.FC<{}> = ({ ...props }) => {
  // prepare data
  const dummy: Player[] = [
    { id: 1, name: "ff", memo: "" },
    { id: 2, name: "bb", memo: "f" },
  ];

  // prepare columns
  const playersColumns = useMemo<Column<Player>[]>(
    () => [
      {
        label: "名前",
        cell: PlayerInputCell,
        onCellValueAccess: (rowModel: Player) => rowModel.name,
        key: "name",
      },
      {
        label: "memo",
        cell: PlayerInputCell,
        onCellValueAccess: (rowModel: Player) => rowModel.memo,
        key: "memo",
      },
    ],
    []
  );

  // prepare table
  const { DataRows, HeaderLabels } = useTable<Player>({
    data: dummy,
    columns: playersColumns,
  });

  return (
    <React.Fragment>
      <table>
        <thead>{HeaderLabels()}</thead>
        <tbody>{DataRows()}</tbody>
      </table>
      <br />
      <Button variant="outlined">追加</Button>
    </React.Fragment>
  );
};
