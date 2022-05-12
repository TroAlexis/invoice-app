import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { bindActionCreators } from "redux";
import reportWebVitals from "./reportWebVitals";
import "./assets/styles/base.scss";
import App from "./components/App/App";
import store from "@/store";
import authApi from "@/api/auth";
import { setSession } from "@/store/action-creators/auth";
import "@/svgSprite";

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
