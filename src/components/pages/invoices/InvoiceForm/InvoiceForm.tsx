import InvoiceFormAddressSection from "components/pages/invoices/InvoiceFormAddressSection/InvoiceFormAddressSection";
import InvoiceFormClientSection from "components/pages/invoices/InvoiceFormClientSection/InvoiceFormClientSection";
import InvoiceFormDates from "components/pages/invoices/InvoiceFormDates/InvoiceFormDates";
import InvoiceFormItemList from "components/pages/invoices/InvoiceFormItemList/InvoiceFormItemList";
import Heading from "components/ui/Heading/Heading";
import Input from "components/ui/Input/Input";
import { Status } from "constants/invoices";
import { castDraft, Immutable } from "immer";
import { ComponentPropsWithoutRef, useCallback } from "react";
import { Invoice, Item } from "types/invoices";
import { BasicSlot, InputHandler, ValueOf } from "types/shared";
import { useImmer } from "use-immer";
import { classNames } from "utils/classnames";
import { isKeyIn, set } from "utils/common";
import { renderSlot } from "utils/dom";
import styles from "./InvoiceForm.module.scss";

type InvoiceData = Immutable<Omit<Invoice, "id">>;

interface Props extends ComponentPropsWithoutRef<"form"> {
  heading: BasicSlot;
  invoice?: Invoice;
}

const paymentTermsOptions = [1, 7, 14, 30].map((value) => {
  return { value };
});

export default function InvoiceForm({ invoice, className, heading }: Props) {
  const classes = classNames([styles.form, className]);
  const { handleChange, handleInput, state } = useInvoiceForm(invoice);
  const handleItemsChange = (value: Item[]) => handleChange("items", value);

  return (
    <form className={classes}>
      <Heading level="h1" className={styles.heading}>
        {renderSlot(heading)}
      </Heading>

      <InvoiceFormAddressSection
        values={state.senderAddress}
        name="senderAddress"
        heading="Bill from"
        className={styles.section}
        onChange={handleChange}
      />

      <InvoiceFormAddressSection
        values={state.clientAddress}
        name="clientAddress"
        heading="Bill to"
        className={styles.section}
        onChange={handleChange}
      >
        {" "}
        <InvoiceFormClientSection
          values={state.client}
          onChange={handleChange}
          inputClassName={styles.input}
        />{" "}
      </InvoiceFormAddressSection>

      <InvoiceFormDates
        className={styles.input}
        createdAt={state.createdAt}
        paymentTerms={state.paymentTerms}
        paymentTermsOptions={paymentTermsOptions}
        handleChange={handleChange}
      />

      <Input
        value={state.description}
        className={styles.input}
        onInput={handleInput}
        name="description"
        label="Project Description"
      />

      <InvoiceFormItemList items={state.items} onChange={handleItemsChange} />
    </form>
  );
}

const useInvoiceForm = (invoice?: Invoice) => {
  const initialState: InvoiceData = invoice
    ? invoice
    : {
        items: [],
        createdAt: new Date(),
        paymentDue: new Date(),
        senderAddress: { street: "", country: "", postCode: "", city: "" },
        clientAddress: { street: "", country: "", postCode: "", city: "" },
        client: { name: "", email: "" },
        description: "",
        status: Status.PENDING,
        paymentTerms: 1,
      };
  const [invoiceState, setInvoiceState] = useImmer<InvoiceData>(initialState);

  const handleChange = useCallback(
    (key: string, value: ValueOf<InvoiceData>) => {
      if (isKeyIn(invoiceState, key)) {
        setInvoiceState((prevState) => set(prevState, key, castDraft(value)));
      } else {
        console.warn(
          `Seems like you are trying to set "${key}" which is not present in invoice interface.`
        );
      }
    },
    [setInvoiceState, invoiceState]
  );

  const handleInput = useCallback<InputHandler>(
    (e) => {
      const { name, value } = e.target as HTMLInputElement;

      handleChange(name, value);
    },
    [handleChange]
  );

  return {
    state: invoiceState,
    handleChange,
    handleInput,
  };
};
