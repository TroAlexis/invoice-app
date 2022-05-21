import {
  CSSProperty,
  PropertyCreator,
  StylesCreator,
} from "components/ui/Select/styles/index";
import { theme } from "components/ui/Select/theme";
import variables from "styles/exports/_variables.module.scss";

type DropdownPropertyCreator<P extends CSSProperty> = PropertyCreator<
  P,
  "dropdownIndicator"
>;

const { color } = theme.dropdownIndicator;

const getTransform: DropdownPropertyCreator<"transform"> = (
  base,
  { selectProps }
) => {
  return selectProps.menuIsOpenAnimatable ? "rotate(180deg)" : "rotate(0deg)";
};

const createDropdownIndicatorStyles: StylesCreator = () => ({
  dropdownIndicator: (base, props) => ({
    ...base,
    color,
    transform: getTransform(base, props),
    transition: variables["transition-fast"],
    ":hover": {
      color,
    },
    ":focus": {
      color,
    },
  }),
});

export default createDropdownIndicatorStyles;
