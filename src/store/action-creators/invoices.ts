import invoicesApi from "@/api/modules/invoices/invoices";
import { useTypedDispatch } from "@/hooks/useTypedStore";
import { InvoiceActionType } from "@/store/types/invoices";

export async function fetchInvoices(
  dispatch: ReturnType<typeof useTypedDispatch>
) {
  const { data: invoices } = await invoicesApi.get();
  const items = invoices ?? [];

  dispatch({ type: InvoiceActionType.SET_ITEMS, items });
}
