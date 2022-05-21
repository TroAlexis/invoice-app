import { StylesCreator } from "components/ui/Select/styles/index";
import colors from "styles/exports/_colors.module.scss";

const createOptionStyles: StylesCreator = (componentProps) => ({
  option: (base, { isSelected }) => ({
    ...base,
    color: isSelected ? colors["violet-200"] : "inherit",
    padding: "1.5rem 2.4rem",
    backgroundColor: "transparent",
    ":hover": {
      color: colors["violet-400"],
    },
    ":active": {
      backgroundColor: colors["grey-100"],
    },
    borderBottom: `1px solid ${colors["grey-300"]}`,
    ":last-of-type": {
      borderBottom: "0",
    },
  }),
});

export default createOptionStyles;
