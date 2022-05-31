import LayoutDefault from "@/layouts/default/default";
import styles from "./modal-aside.module.scss";

export default function ModalAside() {
  return (
    <LayoutDefault
      className={styles.modal}
      mainClassName={styles.main}
      sidebarClassName={styles.sidebar}
    />
  );
}
