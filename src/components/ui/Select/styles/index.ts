import stylesCreators from "components/ui/Select/styles/creators";
import {
  CSSObjectWithLabel,
  GroupBase,
  Props,
  StylesConfig,
} from "react-select";
import { StylesProps } from "react-select/dist/declarations/src/styles";

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

export type CSSProperty = keyof CSSObjectWithLabel;

export type PropertyCreator<
  P extends CSSProperty,
  C extends keyof StylesConfig
> = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  base: CSSObjectWithLabel,
  componentProps: StylesProps<Option, IsMulti, Group>[C]
) => CSSObjectWithLabel[P];

export const composeStyles: StylesCreator = (
  componentProps,
  creators = stylesCreators
) => {
  return creators.reduce(
    (res, creator) => {
      const styles = creator(componentProps);
      return { ...styles, ...res };
    },
    { ...componentProps.styles }
  );
};
