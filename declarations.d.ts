import { GroupBase } from "react-select";
import { Callback } from "types/shared";

declare module "*.svg?sprite";

declare module "react-select/dist/declarations/src/Select" {
  export interface Props<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
  > {
    outline?: boolean;
    menuIsOpenAnimatable?: boolean;
    onMenuCloseAnimated?: Callback;
  }
}
