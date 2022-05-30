import { invoicesApi } from "@/api/modules/invoices/invoices";
import { invoiceShaper } from "@/api/modules/invoices/invoices.shaper";
import { ApiInvoice } from "@/api/modules/invoices/invoices.types";
import { MOCK_API_URL } from "constants/api";
import { $fetch, withTimeout } from "utils/fetch";

type InvoicesApi = typeof invoicesApi;

const invoicesApiMock: InvoicesApi = {
  async getAll() {
    const data: ApiInvoice[] = await withTimeout(
      $fetch(`${MOCK_API_URL}/invoices`)
    );

    return data.map((invoice) => {
      return invoiceShaper(invoice);
    });
  },
  delete(id) {
    return $fetch(`${MOCK_API_URL}/invoices/${id}`, {
      method: "DELETE",
    });
  },
} as const;

export default invoicesApiMock;
