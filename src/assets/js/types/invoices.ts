import { Status } from "constants/invoices";

export type AddressLine = "street" | "city" | "postCode" | "country";
export type Address = Record<AddressLine, string>;
export type PersonLine = "name" | "email";
export type Person = Record<PersonLine, string>;

export interface Item {
  name: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: number;
  from: AddressLine;
  to: AddressLine & Person;
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
