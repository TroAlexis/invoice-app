import { Location, Routes, RoutesProps, useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
import { SwitchTransitionProps } from "react-transition-group/SwitchTransition";

interface Props {
  switchProps: Omit<SwitchTransitionProps, "children">;
  transitionProps: CSSTransitionProps;
  children: RoutesProps["children"];
  location?: Location;
}

export default function AnimatedRoutes({
  switchProps,
  transitionProps,
  children,
  location,
}: Props) {
  const routesLocation = useLocation();
  const locationToUse = location || routesLocation;

  return (
    <SwitchTransition {...switchProps}>
      <CSSTransition {...transitionProps} key={locationToUse.pathname}>
        <Routes location={locationToUse}>{children}</Routes>
      </CSSTransition>
    </SwitchTransition>
  );
}
