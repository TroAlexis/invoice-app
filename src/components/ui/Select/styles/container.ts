import { StylesCreator } from "components/ui/Select/styles/index";
import text from "styles/exports/_text.module.scss";

const createContainerStyles: StylesCreator = () => ({
  container: (base) => ({
    ...base,
    fontSize: "1.2rem",
    fontWeight: "700",
    lineHeight: text["h3-small-line-height"],
    letterSpacing: text["h3-small-letter-spacing"],
  }),
});

export default createContainerStyles;
