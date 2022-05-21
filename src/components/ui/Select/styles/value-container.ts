import { StylesCreator } from "components/ui/Select/styles/index";

const createValueContainerStyles: StylesCreator = () => ({
  valueContainer: (base) => ({
    ...base,
    padding: "1.7rem 2rem 1.6rem 2rem",
  }),
});

export default createValueContainerStyles;
