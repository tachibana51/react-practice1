import { RowModelBase } from "../components/customTable/models";

export interface Player extends RowModelBase {
  id: number;
  name: string;
  memo: string;
}
