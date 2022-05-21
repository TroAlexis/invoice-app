import { SelectProps } from "components/ui/Select/Select";
import stylesCreators from "components/ui/Select/styles/creators";
import {
  CSSObjectWithLabel,
  GroupBase,
  Props,
  StylesConfig,
} from "react-select";
import { StylesProps } from "react-select/dist/declarations/src/styles";
import colors from "styles/exports/_colors.module.scss";

export type StylesCreator<Component = undefined> = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  componentProps: Props<Option, IsMulti, Group> & SelectProps,
  creators?: StylesCreator[]
) => Component extends keyof StylesConfig
  ? StylesConfig<Option, IsMulti, Group>[Component]
  : StylesConfig<Option, IsMulti, Group>;

export type PropertyCreator<
  P extends keyof CSSObjectWithLabel,
  C extends keyof StylesConfig
> = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  selectProps: Props<Option, IsMulti, Group> & SelectProps,
  componentProps: StylesProps<Option, IsMulti, Group>[C]
) => CSSObjectWithLabel[P];

export const composeStyles: StylesCreator = (
  componentProps,
  creators = stylesCreators
) => {
  return creators.reduce((res, creator) => {
    const styles = creator(componentProps);
    return { ...res, ...styles };
  }, {});
};

export const theme = {
  dropdownIndicator: {
    color: colors["violet-400"],
  },
  control: {
    borderColor: colors["violet-400"],
  },
};
