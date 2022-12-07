import { Box, Button, Input, Table, TableBody, TableHead } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useCallback } from "react";
import {
  Column,
  TableCellProps,
} from "../../components/customTable/customTable";
import { useTable } from "../../components/customTable/hooks/useTable";
import { Player } from "../../model/player";

const PlayerInputCell: React.FC<TableCellProps<Player>> = ({ ...props }) => {
  if (props.isEditable && props.onDispach) {
    const handler = (
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      if (props.isEditable && props.onDispach) {
        e.preventDefault();
        props.onDispach(props.rowValue, e.target.value, props.rowKey);
      }
    };
    return (
      <Box textAlign="right" padding="1em">
        <Input
          disableUnderline
          style={{ textAlign: "center", border: "none" }}
          value={props.onAccess(props.rowValue, props.rowKey)}
          onChange={handler}
        />
      </Box>
    );
  }
  return (
    <Box padding={"1em"} textAlign="left" width={"15em"}>
      {props.onAccess(props.rowValue, props.rowKey)}
    </Box>
  );
};

export const PlayersTable: React.FC<{ players: Player[] }> = ({ ...props }) => {
  // prepare data

  const [players, setPlayers] = useState(props.players);
  const [idx, setIdx] = useState(props.players.length);

  // prepare columns
  const playersColumns = useMemo<Column<Player>[]>(
    () => [
      {
        label: "名前",
        valueCell: PlayerInputCell,
        onCellValueAccess: (rowModel: Player) => rowModel["name"],
        key: "name",
      },
      {
        label: "memo",
        valueCell: PlayerInputCell,
        editableValueCell: PlayerInputCell,
        onCellValueAccess: (rowModel: Player) => rowModel["memo"],
        key: "memo",
      },
    ],
    []
  );

  // prepare table
  const { DataRows, HeaderLabels } = useTable<Player>({
    columns: playersColumns,
    data: players,
    dispacher: setPlayers,
  });

  //Button
  // TODO SORT CALLBACK
  const handleAddClick = useCallback(() => {
    setPlayers([
      ...players,
      {
        id: idx + 1,
        name: "aoi",
        memo: "",
      },
    ]);
    setIdx(idx + 1);
  }, [idx, players]);
  return (
    <React.Fragment>
      <Table sx={{ minWidth: 500 }}>
        <TableHead>{HeaderLabels()}</TableHead>
        <TableBody>{DataRows()}</TableBody>
      </Table>
      <br />

      <Button onClick={handleAddClick} variant="outlined">
        追加
      </Button>
    </React.Fragment>
  );
};
