import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Route, Routes } from "react-router-dom";
import LayoutDefault from "@/layouts/default/default";
import Invoices from "@/pages/invoices/index/invoices";

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<LayoutDefault />}>
        <Route index element={<Invoices />} />
      </Route>
    </Routes>
  );
};

export default App;
