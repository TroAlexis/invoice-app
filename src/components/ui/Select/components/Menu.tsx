import { components } from "react-select";
import { SelectComponentsGeneric } from "react-select/dist/declarations/src/components";
import { CSSTransition } from "react-transition-group";

const Menu: SelectComponentsGeneric["Menu"] = ({ children, ...props }) => (
  <CSSTransition
    in={props.selectProps.menuIsOpenAnimatable}
    appear
    timeout={200}
    unmountOnExit
    classNames={"fade"}
    onExited={props.selectProps.onMenuCloseAnimated}
  >
    <components.Menu {...props}>{children}</components.Menu>
  </CSSTransition>
);

export default Menu;
