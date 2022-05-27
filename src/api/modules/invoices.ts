import invoicesApiMock from "@/api/modules/mocks/invoices.mock";
import { MOCK_ON } from "constants/api";
import { Invoice } from "types/invoices";

export const invoicesApi = {
  getAll: async (): Promise<Invoice[]> => {
    return [];
  },
} as const;

const api = MOCK_ON ? invoicesApiMock : invoicesApi;
export default api;