import {
  PropertyCreator,
  StylesCreator,
} from "components/ui/Select/styles/index";
import { CSSObjectWithLabel } from "react-select";

type MenuPropertyCreator<P extends keyof CSSObjectWithLabel> = PropertyCreator<
  P,
  "menu"
>;

const getMarginTop: MenuPropertyCreator<"marginTop"> = ({ outline }) => {
  if (outline) {
    return ".8rem";
  }
  return "2.4rem";
};

const createMenuStyles: StylesCreator = (componentProps) => ({
  menu: (base, props) => ({
    ...base,
    marginTop: getMarginTop(componentProps, props),
    boxShadow: "0px 10px 20px rgba(72, 84, 159, 0.25)",
    borderRadius: "8px",
  }),
});

export default createMenuStyles;
