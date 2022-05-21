import { GroupBase } from "react-select";

declare module "*.svg?sprite";

declare module "react-select/dist/declarations/src/Select" {
  export interface Props<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
  > {
    outline?: boolean;
  }
}
