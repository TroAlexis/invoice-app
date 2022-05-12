import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LayoutDefault from "@/layouts/default/default";
import Invoices from "@/pages/invoices/index/invoices";

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<LayoutDefault />}>
        <Route index element={<Invoices />} />
        <Route path="invoices" element={<Invoices />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
