import {
  PropertyCreator,
  StylesCreator,
  theme,
} from "components/ui/Select/styles/index";
import { CSSObjectWithLabel } from "react-select";
import colors from "styles/exports/_colors.module.scss";

type ControlPropertyCreator<P extends keyof CSSObjectWithLabel> =
  PropertyCreator<P, "control">;

const getBorderColor: ControlPropertyCreator<"borderColor"> = (
  { outline },
  { isFocused }
) => {
  if (outline) {
    return "transparent";
  }
  return isFocused ? theme.control.borderColor : colors["grey-300"];
};

const getHoverBorderColor: ControlPropertyCreator<"borderColor"> = ({
  outline,
}) => {
  if (outline) {
    return "transparent";
  }
  return theme.control.borderColor;
};

const getBoxShadow: ControlPropertyCreator<"boxShadow"> = ({ outline }) => {
  if (outline) {
    return "none";
  }
  return `0 0 0 1px ${theme.control.borderColor}`;
};

const createControlStyles: StylesCreator = (componentProps) => ({
  control: (base, props) => ({
    ...base,
    borderColor: getBorderColor(componentProps, props),
    boxShadow: props.isFocused
      ? getBoxShadow(componentProps, props)
      : base.boxShadow,
    ":hover": {
      borderColor: getHoverBorderColor(componentProps, props),
    },
  }),
});

export default createControlStyles;
