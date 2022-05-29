import invoicesApi from "@/api/modules/invoices";
import useEffectOnce from "@/hooks/useEffectOnce";
import useLoading from "@/hooks/useLoading";
import { useTypedDispatch, useTypedSelector } from "@/hooks/useTypedStore";
import { filteredInvoicesSelector } from "@/store/selectors/invoices";
import { InvoiceActionType } from "@/store/types/invoices";
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
  const invoices = useTypedSelector(filteredInvoicesSelector);
  const { loading, withLoading } = useLoading(true);
  const dispatch = useTypedDispatch();

  const fetchInvoices = async () => {
    const items = await invoicesApi.getAll();
    dispatch({ type: InvoiceActionType.SET_ITEMS, items });
  };
  const fetchWithLoading = withLoading(fetchInvoices);

  useEffectOnce(() => {
    fetchWithLoading();
  });

  return { invoices, loading };
};
