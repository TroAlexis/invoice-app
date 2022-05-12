import { SwitchTransitionProps } from "react-transition-group/SwitchTransition";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Routes, RoutesProps, useLocation } from "react-router-dom";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

interface Props {
  switchProps: Omit<SwitchTransitionProps, "children">;
  transitionProps: CSSTransitionProps;
  children: RoutesProps["children"];
}

export default function AnimatedRoutes({
  switchProps,
  transitionProps,
  children,
}: Props) {
  const location = useLocation();

  return (
    <SwitchTransition {...switchProps}>
      <CSSTransition {...transitionProps} key={location.pathname}>
        <Routes location={location}>{children}</Routes>
      </CSSTransition>
    </SwitchTransition>
  );
}
