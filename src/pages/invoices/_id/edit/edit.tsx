import invoicesApi from "@/api/modules/invoices/invoices";
import { apiInvoiceShaper } from "@/api/modules/invoices/invoices.shaper";
import { useInvoiceForm } from "@/hooks/useInvoiceForm";
import useLoading from "@/hooks/useLoading";
import { useInvoice } from "@/pages/invoices/_id/_id";
import InvoiceModalCard from "components/pages/invoices/_id/InvoiceModalCard/InvoiceModalCard";
import InvoiceForm from "components/pages/invoices/InvoiceForm/InvoiceForm";
import InvoiceId from "components/pages/invoices/InvoiceId/InvoiceId";
import Button from "components/ui/Button/Button";
import { Color } from "constants/color";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { withEventPrevent } from "utils/events";
import styles from "./edit.module.scss";

export default function InvoiceEdit() {
  const { invoice } = useInvoice();
  const { handleChange, handleInput, state } = useInvoiceForm(invoice);
  const { loading, withLoading } = useLoading();

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const handleSave = withLoading(async () => {
    if (invoice?.id) {
      const data = apiInvoiceShaper(state);
      const response = await invoicesApi.patch(invoice.id, data);

      navigate(-1);

      return response;
    }
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    return withEventPrevent(e, handleSave);
  };

  return (
    <InvoiceModalCard>
      <InvoiceForm
        heading={() => (
          <>
            Edit{" "}
            <InvoiceId tag="span" className={styles.id}>
              {invoice?.id}
            </InvoiceId>
          </>
        )}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onInput={handleInput}
        invoice={state}
      >
        <Button
          color={Color.SECONDARY}
          className={styles.cancel}
          onClick={goBack}
        >
          Cancel
        </Button>

        <Button color={Color.VIOLET} type="submit" loading={loading}>
          Save Changes
        </Button>
      </InvoiceForm>
    </InvoiceModalCard>
  );
}
