import { Status } from "constants/invoices";

export type AddressProperty = "street" | "city" | "postCode" | "country";
export type Address = Record<AddressProperty, string>;
export type PersonProperty = "name" | "email";
export type Person = Record<PersonProperty, string>;

export interface Item {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total?: number;
}

export interface Invoice {
  id: number;
  createdAt: Date;
  senderAddress: Partial<Address>;
  clientAddress: Partial<Address>;
  client: Person;
  paymentTerms: number;
  description?: string;
  items: Item[];
  status: Status;
}

export interface Filter {
  value: string;
  label: string;
  filterer: (invoice: Invoice) => boolean;
}

export type InvoiceData = Omit<Invoice, "id">;
