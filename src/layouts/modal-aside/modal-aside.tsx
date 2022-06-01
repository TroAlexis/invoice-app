import { useEventSelf } from "@/hooks/useEventSelf";
import LayoutDefault from "@/layouts/default/default";
import { useNavigate } from "react-router-dom";
import styles from "./modal-aside.module.scss";

export default function ModalAside() {
  const { ref, withEventSelf } = useEventSelf();
  const navigate = useNavigate();

  const navigateBack = () => navigate(-1);
  const handleClickSelf = withEventSelf(navigateBack);

  return (
    <LayoutDefault
      className={styles.modal}
      mainProps={{
        className: styles.main,
        ref,
        onClick: handleClickSelf,
      }}
      sidebarClassName={styles.sidebar}
    />
  );
}
