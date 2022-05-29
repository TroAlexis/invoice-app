import { RootState } from "@/store";
import { createSelector } from "reselect";

export const invoicesSelector = (state: RootState) => state.invoices;

export const filteredInvoicesSelector = createSelector(
  invoicesSelector,
  ({ items, filters }) => {
    return items.filter((item) => {
      return !filters.length || filters.some(({ filterer }) => filterer(item));
    });
  }
);
