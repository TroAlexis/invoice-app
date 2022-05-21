import { StylesCreator } from "components/ui/Select/styles/index";

const createInputStyles: StylesCreator = (componentProps) => ({
  input: (base) => ({
    ...base,
    margin: "0",
    paddingTop: "0",
    paddingBottom: "0",
  }),
});

export default createInputStyles;
