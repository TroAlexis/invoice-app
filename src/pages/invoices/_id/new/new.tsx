import { invoicesApi } from "@/api/modules/invoices/invoices";
import { apiInvoiceShaper } from "@/api/modules/invoices/invoices.shaper";
import { useInvoiceForm } from "@/hooks/useInvoiceForm";
import useLoading from "@/hooks/useLoading";
import InvoiceModalCard from "components/pages/invoices/_id/InvoiceModalCard/InvoiceModalCard";
import InvoiceForm from "components/pages/invoices/InvoiceForm/InvoiceForm";
import Button from "components/ui/Button/Button";
import { Color } from "constants/color";
import { Status } from "constants/invoices";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { withEventPrevent } from "utils/events";
import classes from "./new.module.scss";

interface Props {}

export default function InvoicesNew() {
  const { handleChange, handleInput, state } = useInvoiceForm();
  const { loading, withLoading } = useLoading();
  const saveAsDraft = withLoading(() => {
    const invoice = apiInvoiceShaper(state);
    return invoicesApi.add({
      ...invoice,
      status: Status.DRAFT,
    });
  });

  const handleSave = withLoading(() => {
    const invoice = apiInvoiceShaper(state);
    return invoicesApi.add(invoice);
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    return withEventPrevent(e, handleSave);
  };

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <InvoiceModalCard>
      <InvoiceForm
        heading="New Invoice"
        onChange={handleChange}
        onInput={handleInput}
        invoice={state}
        onSubmit={handleSubmit}
      >
        <Button
          onClick={goBack}
          color={Color.SECONDARY}
          className={classes.discard}
        >
          Discard
        </Button>

        <Button
          onClick={saveAsDraft}
          color={Color.GREY}
          className={classes.draft}
          loading={loading}
        >
          Save as Draft
        </Button>
        <Button color={Color.VIOLET} type="submit" loading={loading}>
          Save & Send
        </Button>
      </InvoiceForm>
    </InvoiceModalCard>
  );
}
