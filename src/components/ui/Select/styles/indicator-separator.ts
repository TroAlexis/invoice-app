import { StylesCreator } from "components/ui/Select/styles/index";

const createIndicatorSeparatorStyles: StylesCreator = (componentProps) => ({
  indicatorSeparator: () => ({
    display: "none",
  }),
});

export default createIndicatorSeparatorStyles;
