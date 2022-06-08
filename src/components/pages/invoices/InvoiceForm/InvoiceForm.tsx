import InvoiceFormAddressSection from "components/pages/invoices/InvoiceFormAddressSection/InvoiceFormAddressSection";
import InvoiceFormClientSection from "components/pages/invoices/InvoiceFormClientSection/InvoiceFormClientSection";
import InvoiceFormDates from "components/pages/invoices/InvoiceFormDates/InvoiceFormDates";
import Heading from "components/ui/Heading/Heading";
import Input from "components/ui/Input/Input";
import { Status } from "constants/invoices";
import { castDraft, Immutable } from "immer";
import { ComponentPropsWithoutRef, useCallback } from "react";
import { Invoice } from "types/invoices";
import { BasicSlot, InputHandler, ValueOf } from "types/shared";
import { useImmer } from "use-immer";
import { classNames } from "utils/classnames";
import { set } from "utils/common";
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
        <InvoiceFormClientSection
          values={state.client}
          onChange={handleChange}
          inputClassName={styles.input}
        />
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
    (key: keyof InvoiceData, value: ValueOf<InvoiceData>) => {
      setInvoiceState((prevState) => set(prevState, key, castDraft(value)));
    },
    [setInvoiceState]
  );

  const isValidName = useCallback(
    (name: string): name is keyof InvoiceData => name in invoiceState,
    [invoiceState]
  );

  const handleInput = useCallback<InputHandler>(
    (e) => {
      const { name, value } = e.target as HTMLInputElement;

      if (isValidName(name)) {
        handleChange(name, value);
      }
    },
    [handleChange, isValidName]
  );

  return {
    state: invoiceState,
    handleChange,
    handleInput,
  };
};
