import {
  CSSProperty,
  PropertyCreator,
  StylesCreator,
} from "components/ui/Select/styles/index";

type MenuPropertyCreator<P extends CSSProperty> = PropertyCreator<P, "menu">;

const getMarginTop: MenuPropertyCreator<"marginTop"> = (
  base,
  { selectProps }
) => {
  if (selectProps.outline) {
    return ".8rem";
  }
  return "2.4rem";
};

const createMenuStyles: StylesCreator = (componentProps) => ({
  menu: (base, props) => ({
    ...base,
    marginTop: getMarginTop(base, props),
    boxShadow: "0px 10px 20px rgba(72, 84, 159, 0.25)",
    borderRadius: "8px",
  }),
});

export default createMenuStyles;
