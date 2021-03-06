import supabase from "@/api";
import { fetchInvoices } from "@/store/action-creators/invoices";
import rootReducer from "@/store/reducers";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";

const middlewareEnhancer = applyMiddleware(thunk);
const compose = composeWithDevTools({ trace: true });
const composedEnhancers = compose(middlewareEnhancer);

const store = createStore(rootReducer, undefined, composedEnhancers);

supabase
  .from("invoices")
  .on("*", () => {
    return fetchInvoices(store.dispatch);
  })
  .subscribe();

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
