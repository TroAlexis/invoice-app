import { useEventSelf } from "@/hooks/useEventSelf";
import { useTypedSelector } from "@/hooks/useTypedStore";
import { authSelector } from "@/store/selectors/auth";
import AnimatedRoutes from "components/AnimatedRoutes/AnimatedRoutes";
import TheSidebar, { Classes } from "components/TheSidebar/TheSidebar";
import WelcomeForm from "components/WelcomeForm/WelcomeForm";

import { Path } from "constants/route";

import React, { ComponentPropsWithoutRef, useState } from "react";
import { shallowEqual } from "react-redux";
import { Navigate, Outlet, Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { classNames } from "utils/classnames";
import styles from "./default.module.scss";

export default function Default({
  className,
}: ComponentPropsWithoutRef<"div">) {
  const classes = classNames([styles.layout, className]);
  const { ref, withEventSelf } = useEventSelf();
  const { session } = useTypedSelector(authSelector, shallowEqual);
  const hasSession = Boolean(session);

  const [transitioned, setTransitioned] = useState<boolean>(hasSession);

  const isAuthenticated = hasSession && transitioned;
  const isFormVisible = !hasSession && !transitioned;

  const onTransitionEnd = withEventSelf(() => {
    setTransitioned(hasSession);
  });

  const sidebarClasses = getSideBarClasses(hasSession);

  return (
    <div className={classes}>
      <TheSidebar
        ref={ref}
        {...sidebarClasses}
        onTransitionEnd={onTransitionEnd}
        isAuthenticated={isAuthenticated}
      >
        {!isAuthenticated && <AuthenticationRoutes visible={isFormVisible} />}
      </TheSidebar>

      <Main visible={isAuthenticated} />
    </div>
  );
}

function getSideBarClasses(isAuthenticated: boolean): Partial<Classes> {
  const className = classNames([
    styles.sidebar,
    !isAuthenticated && styles["is-not-authenticated"],
  ]);

  return {
    className,
    logoClassName: styles.logo,
    navigationClassName: styles.navigation,
  };
}

interface Transitionable {
  visible: boolean;
}

function AuthenticationRoutes({ visible }: Transitionable) {
  return (
    <CSSTransition
      in={visible}
      classNames="fade"
      timeout={200}
      unmountOnExit
      mountOnEnter
    >
      <AnimatedRoutes
        switchProps={{ mode: "out-in" }}
        transitionProps={{ classNames: "fade", timeout: 200 }}
      >
        {[Path.LOGIN, Path.SIGNUP].map((path) => (
          <Route
            path={path}
            key={path}
            element={<WelcomeForm className={styles.form} form={path} />}
          />
        ))}

        <Route path="*" element={<Navigate to={`/${Path.LOGIN}`} replace />} />
      </AnimatedRoutes>
    </CSSTransition>
  );
}

function Main({ visible }: Transitionable) {
  return (
    <CSSTransition
      timeout={{
        enter: 200,
        exit: 0,
      }}
      in={visible}
      classNames="fade"
      mountOnEnter
      unmountOnExit
    >
      <main className={styles.main}>
        <Outlet />
      </main>
    </CSSTransition>
  );
}
