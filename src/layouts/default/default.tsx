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

export default function Default() {
  const { session } = useTypedSelector((state) => state.auth);
  const isAuthenticated = Boolean(session);

  const sidebarClasses = getSideBarClasses(isAuthenticated);

  const [isLoggedIn] = useState(false);

  return (
    <div className={styles.layout}>
      <TheSidebar {...sidebarClasses}>
        {!isAuthenticated && <AuthenticationRoutes visible={!isLoggedIn} />}
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
  if (isAuthenticated) {
    return {};
  }

  const className = classNames([
    styles.sidebar,
    styles["is-not-authenticated"],
  ]);

  return {
    className,
    logoClassName: styles.logo,
    navigationClassName: styles.navigation,
    profileClassName: styles.profile,
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
