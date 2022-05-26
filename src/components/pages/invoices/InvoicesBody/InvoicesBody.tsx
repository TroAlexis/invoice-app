import { useTypedSelector } from "@/hooks/useTypedStore";
import { invoicesSelector } from "@/store/selectors/invoices";
import InvoicesBodyEmpty from "components/pages/invoices/InvoicesBodyEmpty/InvoicesBodyEmpty";
import Container from "components/ui/Container/Container";
import styles from "./InvoicesBody.module.scss";

interface Props {}

export default function InvoicesBody() {
  const { items } = useTypedSelector(invoicesSelector);

  return (
    <div className={styles.wrapper}>
      <Container column className={styles.container}>
        {items.length ? (
          "Invoices"
        ) : (
          <InvoicesBodyEmpty className={styles.empty} />
        )}
      </Container>
    </div>
  );
}
