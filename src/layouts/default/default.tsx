import React from "react";
import styles from "./default.module.scss";
import TheSidebar, { Classes } from "components/TheSidebar/TheSidebar";
import { Outlet } from "react-router-dom";
import { useTypedSelector } from "@/hooks/useTypedStore";
import { AuthState } from "@/store/types/auth";
import LoginForm from "components/LoginForm/LoginForm";
import { classNames } from "utils/classnames";

export default function Default() {
  const { session } = useTypedSelector((state) => state.auth);
  const sidebarClasses = getSideBarClasses(session);

  return (
    <div className={styles.layout}>
      <TheSidebar {...sidebarClasses}>
        {!session && <LoginForm className={styles.form} />}
      </TheSidebar>

      {session && (
        <main className={styles.main}>
          <Outlet />
        </main>
      )}
    </div>
  );
}

function getSideBarClasses(session: AuthState["session"]): Partial<Classes> {
  if (session) {
    return {};
  }

  const className = classNames([
    styles.sidebar,
    styles["is-not-authenticated"],
  ]);

  return {
    className,
    logoClassName: styles.logo,
    profileClassName: styles.profile,
  };
}
