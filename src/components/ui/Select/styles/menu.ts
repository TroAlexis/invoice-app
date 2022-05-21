import { StylesCreator } from "components/ui/Select/styles/index";

const createMenuStyles: StylesCreator = (componentProps) => ({
  menu: (base) => ({
    ...base,
    marginTop: "2.4rem",
    boxShadow: "0px 10px 20px rgba(72, 84, 159, 0.25)",
    borderRadius: "8px",
  }),
});

export default createMenuStyles;
