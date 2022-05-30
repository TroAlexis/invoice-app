import authApi from "@/api/modules/auth/auth";
import store from "@/store";
import { setSession } from "@/store/action-creators/auth";
import "@/svgSprite";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import "./assets/styles/base.scss";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";

// Init auth ------
const boundSetSession = bindActionCreators(setSession, store.dispatch);

authApi.onStateChange(async (event, session) => {
  boundSetSession(session);
});
// Init auth ------

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
