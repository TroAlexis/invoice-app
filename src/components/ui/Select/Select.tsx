import ReactSelect, { GroupBase, Props, StylesConfig } from "react-select";
import colors from "styles/exports/_colors.module.scss";
import text from "styles/exports/_text.module.scss";

const theme = {
  dropdownIndicator: {
    color: colors["violet-400"],
  },
  control: {
    borderColor: colors["violet-400"],
  },
};

export default function Select<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
  const styles = getStyles<Option, IsMulti, Group>();

  return <ReactSelect {...props} styles={styles} blurInputOnSelect />;
}

function getStyles<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(): StylesConfig<Option, IsMulti, Group> {
  return {
    container: (base) => ({
      ...base,
      fontSize: "1.2rem",
      fontWeight: "700",
      lineHeight: text["h3-small-line-height"],
      letterSpacing: text["h3-small-letter-spacing"],
    }),
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
    valueContainer: (base) => ({
      ...base,
      padding: "1.7rem 2rem 1.6rem 2rem",
    }),
    input: (base) => ({
      ...base,
      margin: "0",
      paddingTop: "0",
      paddingBottom: "0",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
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
    menu: (base) => ({
      ...base,
      marginTop: "2.4rem",
      boxShadow: "0px 10px 20px rgba(72, 84, 159, 0.25)",
      borderRadius: "8px",
    }),
    menuList: (base) => ({
      ...base,
      paddingTop: "0",
      paddingBottom: "0",
    }),
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
  };
}
