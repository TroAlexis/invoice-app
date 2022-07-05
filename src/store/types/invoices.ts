import { Action } from "redux";
import { Filter, Invoice } from "types/invoices";

export interface InvoicesState {
  items: Invoice[];
  filters: Filter[];
}

export enum InvoiceActionType {
  SET_ITEMS = "SET_ITEMS",
  ADD_ITEM = "ADD_ITEM",
  REMOVE_ITEM = "REMOVE_ITEM",
  SET_FILTERS = "SET_FILTERS",
}

export interface SetItems extends Action {
  type: InvoiceActionType.SET_ITEMS;
  items: Invoice[];
}

export interface AddItem extends Action {
  type: InvoiceActionType.ADD_ITEM;
  item: Invoice;
}

export interface RemoveItem extends Action {
  type: InvoiceActionType.REMOVE_ITEM;
  id: number;
}

export interface SetFilters extends Action {
  type: InvoiceActionType.SET_FILTERS;
  filters: Filter[];
}

export type InvoicesAction = SetItems | AddItem | RemoveItem | SetFilters;
