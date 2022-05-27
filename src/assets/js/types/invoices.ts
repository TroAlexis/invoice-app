import { Status } from "constants/invoices";

export type AddressProperty = "street" | "city" | "postCode" | "country";
export type Address = Record<AddressProperty, string>;
export type PersonProperty = "name" | "email";
export type Person = Record<PersonProperty, string>;

export interface Item {
  name: string;
  quantity: number;
  price: number;
  total?: number;
}

export interface Invoice {
  id: number;
  createdAt: Date;
  senderAddress: Address;
  clientAddress: Address;
  client: Person;
  paymentTerms: number;
  paymentDue: Date;
  description: string;
  items: Item[];
  total?: number;
  status?: Status;
}

export interface Filter {
  value: string;
  label: string;
  filterer: (invoice: Invoice) => boolean;
}
