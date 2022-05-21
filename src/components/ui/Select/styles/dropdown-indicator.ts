import { StylesCreator, theme } from "components/ui/Select/styles/index";

const createDropdownIndicatorStyles: StylesCreator = (componentProps) => ({
  dropdownIndicator: (base) => ({
    ...base,
    ...theme.dropdownIndicator,
    ":hover": {
      ...theme.dropdownIndicator,
    },
    ":focus": {
      ...theme.dropdownIndicator,
    },
  }),
});

export default createDropdownIndicatorStyles;
