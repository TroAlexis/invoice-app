import React from "react";
import styles from "./default.module.scss";
import TheSidebar from "components/TheSidebar/TheSidebar";
import { Outlet } from "react-router-dom";
import RequireAuth from "components/RequireAuth/RequireAuth";

export default function Default() {
  return (
    <div className={styles.layout}>
      <TheSidebar />

      <main className={styles.main}>
        <RequireAuth>
          <Outlet />
        </RequireAuth>
      </main>
    </div>
  );
}
