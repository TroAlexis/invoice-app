import { Item } from "types/invoices";

export interface ApiInvoice {
  id: string;
  created_at: string;
  payment_due: string;
  description: string;
  payment_terms: number;
  status: string;
  client: {
    name: string;
    email: string;
  };
  sender_address: {
    street: string;
    city: string;
    post_code: string;
    country: string;
  };
  client_address: {
    street: string;
    city: string;
    post_code: string;
    country: string;
  };
  items: Item[];
  total?: number;
}

export type ApiInvoiceDto = Omit<ApiInvoice, "id" | "created_at">;
