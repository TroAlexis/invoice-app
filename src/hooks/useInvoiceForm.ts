import { Status } from "constants/invoices";
import { castDraft, Immutable } from "immer";
import { useCallback } from "react";
import { Invoice } from "types/invoices";
import { InputHandler, ValueOf } from "types/shared";
import { useImmer } from "use-immer";
import { isKeyIn, set } from "utils/common";

export type InvoiceData = Immutable<Omit<Invoice, "id">>;

export const useInvoiceForm = (invoice?: Invoice) => {
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
