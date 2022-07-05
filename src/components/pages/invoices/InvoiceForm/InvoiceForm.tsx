import InvoiceFormAddressSection from "components/pages/invoices/InvoiceFormAddressSection/InvoiceFormAddressSection";
import InvoiceFormClientSection from "components/pages/invoices/InvoiceFormClientSection/InvoiceFormClientSection";
import InvoiceFormDates from "components/pages/invoices/InvoiceFormDates/InvoiceFormDates";
import InvoiceFormItemList from "components/pages/invoices/InvoiceFormItemList/InvoiceFormItemList";
import Heading from "components/ui/Heading/Heading";
import Input from "components/ui/Input/Input";
import { ComponentPropsWithoutRef } from "react";
import { InvoiceData, Item } from "types/invoices";
import { BasicSlot, InputHandler, ValueOf } from "types/shared";
import { classNames } from "utils/classnames";
import { renderSlot } from "utils/dom";
import styles from "./InvoiceForm.module.scss";

interface OwnProps {
  heading: BasicSlot;
  invoice: InvoiceData;
  onChange: (key: string, value: ValueOf<InvoiceData>) => void;
  onInput: InputHandler;
}

interface Props
  extends OwnProps,
    Omit<ComponentPropsWithoutRef<"form">, keyof OwnProps> {}

const paymentTermsOptions = [1, 7, 14, 30].map((value) => {
  return { value };
});

export default function InvoiceForm({
  invoice,
  className,
  heading,
  onChange,
  onInput,
  children,
  ...attrs
}: Props) {
  const classes = classNames([styles.form, className]);
  const handleItemsChange = (value: Item[]) => onChange("items", value);

  return (
    <form className={classes} {...attrs}>
      <Heading level="h1" className={styles.heading}>
        {renderSlot(heading)}
      </Heading>

      <InvoiceFormAddressSection
        values={invoice.senderAddress}
        name="senderAddress"
        heading="Bill from"
        className={styles.section}
        onChange={onChange}
      />

      <InvoiceFormAddressSection
        values={invoice.clientAddress}
        name="clientAddress"
        heading="Bill to"
        className={styles.section}
        onChange={onChange}
      >
        <InvoiceFormClientSection
          values={invoice.client}
          onChange={onChange}
          inputClassName={styles.input}
        />
      </InvoiceFormAddressSection>

      <InvoiceFormDates
        className={styles.input}
        createdAt={invoice.createdAt}
        paymentTerms={invoice.paymentTerms}
        paymentTermsOptions={paymentTermsOptions}
        handleChange={onChange}
      />

      <Input
        value={invoice.description}
        className={styles.input}
        onInput={onInput}
        name="description"
        label="Project Description"
      />

      <InvoiceFormItemList items={invoice.items} onChange={handleItemsChange} />

      <div className={styles.footer}>{children}</div>
    </form>
  );
}
