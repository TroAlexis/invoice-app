import { StylesCreator } from "components/ui/Select/styles/index";

const createMenuListStyles: StylesCreator = (componentProps) => ({
  menuList: (base) => ({
    ...base,
    paddingTop: "0",
    paddingBottom: "0",
  }),
});

export default createMenuListStyles;
