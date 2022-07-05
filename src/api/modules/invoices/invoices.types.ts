import { Item } from "types/invoices";

export interface ApiInvoice {
  id: number;
  created_at: string;
  description?: string;
  payment_terms: number;
  status: string;
  client: {
    name: string;
    email: string;
  };
  sender_address?: Partial<{
    street: string;
    city: string;
    post_code: string;
    country: string;
  }>;
  client_address?: Partial<{
    street: string;
    city: string;
    post_code: string;
    country: string;
  }>;
  items?: Item[];
  total?: number;
}

export type ApiInvoiceDto = Omit<ApiInvoice, "id" | "created_at">;
