import { useTypedSelector } from "@/hooks/useTypedStore";
import { invoicesSelector } from "@/store/selectors/invoices";
import styles from "components/pages/invoices/InvoicesHeaderCount/InvoicesHeaderCount.module.scss";
import Text from "components/ui/Text/Text";
import { FC } from "react";
import { Filter } from "types/invoices";

export interface Props {
  count?: number;
}

const InvoicesHeaderCount: FC<Props> = ({ count }) => {
  const { filters } = useTypedSelector(invoicesSelector);

  return (
    <Text className={styles.count}>
      {count ? (
        <>
          There are {count} <Types filters={filters} /> invoices
        </>
      ) : (
        "No invoices"
      )}
    </Text>
  );
};

interface TypesProps {
  filters: Filter[];
}

const Types: FC<TypesProps> = ({ filters }) => {
  const types = filters.reduce((res, { label }) => {
    return res.length ? [res, label].join(", ") : label;
  }, "");

  return <span>{types || "total"}</span>;
};

export default InvoicesHeaderCount;
