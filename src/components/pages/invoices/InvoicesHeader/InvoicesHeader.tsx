import { useTypedSelector } from "@/hooks/useTypedStore";
import { invoicesSelector } from "@/store/selectors/invoices";
import InvoicesHeaderControls from "components/pages/invoices/InvoicesHeaderControls/InvoicesHeaderControls";
import InvoicesHeaderCount, {
  Props as InvoicesHeaderCountProps,
} from "components/pages/invoices/InvoicesHeaderCount/InvoicesHeaderCount";
import Container from "components/ui/Container/Container";
import Heading from "components/ui/Heading/Heading";
import { Status } from "constants/invoices";
import { ComponentPropsWithoutRef, FC } from "react";
import { shallowEqual } from "react-redux";
import { Filter } from "types/invoices";
import { classNames } from "utils/classnames";
import styles from "./InvoicesHeader.module.scss";

const statusLabels = {
  [Status.DRAFT]: "Draft",
  [Status.PENDING]: "Pending",
  [Status.PAID]: "Paid",
};

const filterOptions: Filter[] = [Status.DRAFT, Status.PENDING, Status.PAID].map(
  (value) => {
    return {
      label: statusLabels[value],
      filterer: (invoice) => invoice.status === value,
      value,
    };
  }
);

interface Props extends ComponentPropsWithoutRef<"header"> {}

export default function InvoicesHeader({ className, ...props }: Props) {
  const { items } = useTypedSelector(invoicesSelector, shallowEqual);
  const invoicesCount = items.length;
  const classes = classNames([className]);

  return (
    <header {...props} className={classes}>
      <Container className={styles.wrapper}>
        {" "}
        <InvoicesHeaderHeading count={invoicesCount} />
        <InvoicesHeaderControls options={filterOptions} />{" "}
      </Container>
    </header>
  );
}

const InvoicesHeaderHeading: FC<InvoicesHeaderCountProps> = ({ count }) => {
  return (
    <div className={styles.heading}>
      <Heading level="h1" className={styles.title}>
        {" "}
        Invoices{" "}
      </Heading>{" "}
      <InvoicesHeaderCount count={count} />
    </div>
  );
};
