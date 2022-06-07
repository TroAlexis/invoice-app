import InvoiceFormAddressSection from "components/pages/invoices/InvoiceFormAddressSection/InvoiceFormAddressSection";
import InvoiceFormDates from "components/pages/invoices/InvoiceFormDates/InvoiceFormDates";
import InvoiceFormSection from "components/pages/invoices/InvoiceFormSection/InvoiceFormSection";
import Heading from "components/ui/Heading/Heading";
import Input from "components/ui/Input/Input";
import { Status } from "constants/invoices";
import { ComponentPropsWithoutRef, useCallback } from "react";
import { Invoice } from "types/invoices";
import { BasicSlot, ValueOf } from "types/shared";
import { useImmer } from "use-immer";
import { classNames } from "utils/classnames";
import { set } from "utils/common";
import { renderSlot } from "utils/dom";
import styles from "./InvoiceForm.module.scss";

type InvoiceData = Omit<Invoice, "id">;

interface Props extends ComponentPropsWithoutRef<"form"> {
  heading: BasicSlot;
  invoice?: Invoice;
}

const paymentTermsOptions = [1, 7, 14, 30].map((value) => {
  return { value };
});

export default function InvoiceForm({ invoice, className, heading }: Props) {
  const classes = classNames([styles.form, className]);
  const { handleChange, state } = useInvoiceForm(invoice);

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
        <InvoiceFormSection
          values={state.client}
          name="client"
          onChange={handleChange}
        >
          {({ handleInput, values }) => (
            <>
              <Input
                label="Client's Name"
                name="name"
                value={values.name}
                className={styles.input}
                onInput={handleInput}
              />
              <Input
                label="Client's Email"
                name="email"
                value={values.email}
                className={styles.input}
                onInput={handleInput}
              />
            </>
          )}
        </InvoiceFormSection>
      </InvoiceFormAddressSection>

      <InvoiceFormDates
        createdAt={state.createdAt}
        paymentTerms={state.paymentTerms}
        paymentTermsOptions={paymentTermsOptions}
        handleChange={handleChange}
      />
    </form>
  );
}

const useInvoiceForm = (invoice?: Invoice) => {
  const initialState = invoice
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
      return setInvoiceState((prevState) => set(prevState, key, value));
    },
    [setInvoiceState]
  );

  return {
    state: invoiceState,
    handleChange,
  };
};
