import { RowModelBase } from "../components/customTable/models";

export interface Player extends RowModelBase {
  name: string;
  memo: string;
}
