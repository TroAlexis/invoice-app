import React, { useState } from "react";
import styles from "./default.module.scss";
import TheSidebar, { Classes } from "components/TheSidebar/TheSidebar";
import { Navigate, Outlet, Route } from "react-router-dom";
import { useTypedSelector } from "@/hooks/useTypedStore";
import { classNames } from "utils/classnames";
import WelcomeForm from "components/WelcomeForm/WelcomeForm";
import { Path } from "constants/route";
import { CSSTransition } from "react-transition-group";
import AnimatedRoutes from "components/AnimatedRoutes/AnimatedRoutes";
import { useEventSelf } from "@/hooks/useEventSelf";

export default function Default() {
  const { ref, withEventSelf } = useEventSelf();
  const { session } = useTypedSelector((state) => state.auth);
  const hasSession = Boolean(session);

  const [transitioned, setTransitioned] = useState<boolean>(hasSession);

  const isAuthenticated = hasSession && transitioned;
  const isFormVisible = !hasSession && !transitioned;

  const onTransitionEnd = withEventSelf(() => {
    setTransitioned(hasSession);
  });

  const sidebarClasses = getSideBarClasses(hasSession);

  return (
    <div className={styles.layout}>
      <TheSidebar
        ref={ref}
        {...sidebarClasses}
        onTransitionEnd={onTransitionEnd}
        isAuthenticated={isAuthenticated}
      >
        {!isAuthenticated && <AuthenticationRoutes visible={isFormVisible} />}
      </TheSidebar>

      {isAuthenticated && (
        <main className={styles.main}>
          <Outlet />
        </main>
      )}
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

function AuthenticationRoutes({ visible }: { visible: boolean }) {
  return (
    <CSSTransition in={visible} classNames="fade" timeout={200} unmountOnExit>
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
