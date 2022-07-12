import useEffectOnce from "@/hooks/useEffectOnce";
import useLoading from "@/hooks/useLoading";
import { useTypedDispatch, useTypedSelector } from "@/hooks/useTypedStore";
import { fetchInvoices } from "@/store/action-creators/invoices";
import {
  filteredInvoicesSelector,
  invoicesSelector,
} from "@/store/selectors/invoices";
import InvoicesBodyEmpty from "components/pages/invoices/index/InvoicesBodyEmpty/InvoicesBodyEmpty";
import InvoicesList from "components/pages/invoices/index/InvoicesList/InvoicesList";
import Container from "components/ui/Container/Container";
import Loader, { Speed } from "components/ui/Loader/Loader";
import { Color } from "constants/color";
import { FC, PropsWithChildren } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import styles from "./InvoicesBody.module.scss";

export default function InvoicesBody() {
  const { invoices, loading } = useInvoices();

  return (
    <div className={styles.wrapper}>
      <Container column className={styles.container}>
        <Transition loading={loading}>
          {loading ? (
            <Loader
              className={styles.loader}
              color={Color.VIOLET}
              speed={Speed.SLOW}
            />
          ) : (
            <Transition loading={!!invoices.length}>
              {invoices.length ? (
                <InvoicesList invoices={invoices} />
              ) : (
                <InvoicesBodyEmpty className={styles.empty} />
              )}
            </Transition>
          )}
        </Transition>
      </Container>
    </div>
  );
}

interface TransitionProps {
  loading: boolean;
}

const Transition: FC<PropsWithChildren<TransitionProps>> = ({
  loading,
  children,
}) => {
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition key={`${loading}`} classNames="fade" timeout={200}>
        {children}
      </CSSTransition>
    </SwitchTransition>
  );
};

const useInvoices = () => {
  const { items } = useTypedSelector(invoicesSelector);
  const invoices = useTypedSelector(filteredInvoicesSelector);

  const shouldFetch = !items.length;

  const { loading, withLoading } = useLoading(shouldFetch);
  const dispatch = useTypedDispatch();

  const fetchWithLoading = withLoading(fetchInvoices);

  useEffectOnce(() => {
    if (shouldFetch) {
      fetchWithLoading(dispatch);
    }
  });

  return { invoices, loading };
};
