import { StylesCreator, theme } from "components/ui/Select/styles/index";
import colors from "styles/exports/_colors.module.scss";

const createControlStyles: StylesCreator = () => ({
  control: (base, { isFocused }) => ({
    ...base,
    borderColor: isFocused ? theme.control.borderColor : colors["grey-300"],
    boxShadow: isFocused
      ? `0 0 0 1px ${theme.control.borderColor}`
      : base.boxShadow,
    ":hover": {
      ...theme.control,
    },
  }),
});

export default createControlStyles;
