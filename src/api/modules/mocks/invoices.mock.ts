import { invoicesApi } from "@/api/modules/invoices";
import { MOCK_API_URL } from "constants/api";
import { $fetch, withTimeout } from "utils/fetch";

type InvoicesApi = typeof invoicesApi;

const invoicesApiMock: InvoicesApi = {
  getAll() {
    return withTimeout($fetch(`${MOCK_API_URL}/invoices`));
  },
} as const;

export default invoicesApiMock;
