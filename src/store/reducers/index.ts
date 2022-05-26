import authReducer from "@/store/reducers/authReducer";
import invoicesReducer from "@/store/reducers/invoicesReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  invoices: invoicesReducer,
});

export default rootReducer;
