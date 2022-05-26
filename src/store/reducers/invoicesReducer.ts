import {
  InvoiceActionType,
  InvoicesAction,
  InvoicesState,
} from "@/store/types/invoices";
import { Reducer } from "redux";

export const defaultState: InvoicesState = {
  items: [],
  filters: [],
};

const invoicesReducer: Reducer<InvoicesState, InvoicesAction> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case InvoiceActionType.SET_ITEMS:
      return { ...state, items: action.items };
    case InvoiceActionType.ADD_ITEM:
      return { ...state, items: [...state.items, action.item] };
    case InvoiceActionType.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(({ id }) => id === action.id),
      };
    case InvoiceActionType.SET_FILTERS:
      return {
        ...state,
        filters: action.filters,
      };
    default:
      return state;
  }
};

export default invoicesReducer;
