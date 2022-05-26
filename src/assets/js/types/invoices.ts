import { Status } from "constants/invoices";

export type AddressProperty = "street" | "city" | "postCode" | "country";
export type Address = Record<AddressProperty, string>;
export type PersonProperty = "name" | "email";
export type Person = Record<PersonProperty, string>;

export interface Item {
  name: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: number;
  from: Address;
  to: Address & Person;
  date: Date;
  term: string;
  description: string;
  items: Item[];
  status?: Status;
}

export interface Filter {
  value: string;
  label: string;
  filterer: (invoice: Invoice) => boolean;
}
