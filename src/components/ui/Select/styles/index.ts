import stylesCreators from "components/ui/Select/styles/creators";
import { GroupBase, Props, StylesConfig } from "react-select";
import colors from "styles/exports/_colors.module.scss";

export type StylesCreator<Component = undefined> = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  componentProps: Props<Option, IsMulti, Group>,
  creators?: StylesCreator[]
) => Component extends keyof StylesConfig
  ? StylesConfig<Option, IsMulti, Group>[Component]
  : StylesConfig<Option, IsMulti, Group>;

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
