import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Route, Routes } from "react-router-dom";
import LayoutDefault from "@/layouts/default/default";
import Invoices from "@/pages/invoices/index/invoices";
import { useActions } from "@/hooks/useActions";
import authApi from "@/api/auth";

const App = (): JSX.Element => {
  const { setSession } = useActions();

  useEffect(() => {
    const userSession = authApi.getSession();

    setSession(userSession);

    authApi.onStateChange((event, session) => {
      setSession(session);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route element={<LayoutDefault />}>
        <Route index element={<Invoices />} />
        <Route path="invoices" element={<Invoices />} />
      </Route>
    </Routes>
  );
};

export default App;
