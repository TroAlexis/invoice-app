import LayoutDefault from "@/layouts/default/default";
import InvoicePage from "@/pages/invoices/_id/_id";
import Invoices from "@/pages/invoices/index/invoices";
import AnimatedRoutes from "components/AnimatedRoutes/AnimatedRoutes";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Navigate, Route, Routes } from "react-router-dom";

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<LayoutDefault />}>
        <Route path="invoices/*" element={<InvoicesRoutes />} />

        <Route path="*" element={<Navigate to="/invoices" replace />} />
      </Route>
    </Routes>
  );
};

export default App;

const InvoicesRoutes = () => {
  return (
    <AnimatedRoutes
      switchProps={{ mode: "out-in" }}
      transitionProps={{ classNames: "fade", timeout: 200 }}
    >
      <Route index element={<Invoices />} />
      <Route path=":id" element={<InvoicePage />} />
    </AnimatedRoutes>
  );
};
