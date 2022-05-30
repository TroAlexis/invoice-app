import { invoicesApi } from "@/api/modules/invoices";
import { invoiceShaper } from "@/api/modules/shapers/invoices.shaper";
import { ApiInvoice } from "@/api/modules/types/invoices.types";
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
