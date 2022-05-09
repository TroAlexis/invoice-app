import React from "react";
import styles from "./default.module.scss";
import TheSidebar from "components/TheSidebar/TheSidebar";
import { Outlet } from "react-router-dom";

export default function Default() {
  return (
    <div className={styles.layout}>
      <TheSidebar />

      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
}
