import {
  CSSProperty,
  PropertyCreator,
  StylesCreator,
} from "components/ui/Select/styles/index";
import { theme } from "components/ui/Select/theme";
import colors from "styles/exports/_colors.module.scss";

type ControlPropertyCreator<P extends CSSProperty> = PropertyCreator<
  P,
  "control"
>;

const getBorderColor: ControlPropertyCreator<"borderColor"> = (
  base,
  { isFocused, selectProps }
) => {
  if (selectProps.outline) {
    return "transparent";
  }
  return isFocused ? theme.control.borderColor : colors["grey-300"];
};

const getHoverBorderColor: ControlPropertyCreator<"borderColor"> = (
  base,
  { selectProps }
) => {
  if (selectProps.outline) {
    return "transparent";
  }
  return theme.control.borderColor;
};

const getBoxShadow: ControlPropertyCreator<"boxShadow"> = (
  base,
  { selectProps }
) => {
  if (selectProps.outline) {
    return "none";
  }
  return `0 0 0 1px ${theme.control.borderColor}`;
};

const createControlStyles: StylesCreator = () => ({
  control: (base, props) => ({
    ...base,
    borderColor: getBorderColor(base, props),
    boxShadow: props.isFocused ? getBoxShadow(base, props) : base.boxShadow,
    ":hover": {
      borderColor: getHoverBorderColor(base, props),
    },
  }),
});

export default createControlStyles;
