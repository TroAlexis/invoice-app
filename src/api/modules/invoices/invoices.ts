import invoicesApiMock from "@/api/modules/invoices/invoices.mock";
import { MOCK_ON } from "constants/api";
import { Invoice } from "types/invoices";

export const invoicesApi = {
  getAll: async (): Promise<Invoice[]> => {
    return [];
  },
  delete: async (id: Invoice["id"]) => null,
} as const;

const api = MOCK_ON ? invoicesApiMock : invoicesApi;
export default api;
