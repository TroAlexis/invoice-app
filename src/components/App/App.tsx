import LayoutDefault from "@/layouts/default/default";
import ModalAside from "@/layouts/modal-aside/modal-aside";
import InvoicePage from "@/pages/invoices/_id/_id";
import InvoiceEdit from "@/pages/invoices/_id/edit/edit";
import InvoicesNew from "@/pages/invoices/_id/new/new";
import Invoices from "@/pages/invoices/index/invoices";
import AnimatedRoutes from "components/AnimatedRoutes/AnimatedRoutes";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  Location,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

const App = (): JSX.Element => {
  const location = useLocation();

  const state = location.state as { backgroundLocation?: Location };

  const currentLocation = state?.backgroundLocation || location;

  return (
    <>
      <Routes location={currentLocation}>
        <Route path="*" element={<LayoutDefault />}>
          <Route
            path="invoices/*"
            element={<InvoicesRoutes location={currentLocation} />}
          />

          <Route path="*" element={<Navigate to="/invoices" replace />} />
        </Route>
      </Routes>

      {state?.backgroundLocation && <InvoicesModalRoutes />}
    </>
  );
};

export default App;

const InvoicesRoutes = ({ location }: { location: Location }) => {
  return (
    <AnimatedRoutes
      location={location}
      switchProps={{ mode: "out-in" }}
      transitionProps={{ classNames: "fade", timeout: 200 }}
    >
      <Route index element={<Invoices />} />
      <Route path=":id" element={<InvoicePage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </AnimatedRoutes>
  );
};

const InvoicesModalRoutes = () => {
  return (
    <Routes>
      <Route path="invoices/*" element={<ModalAside />}>
        <Route path="new" element={<InvoicesNew />} />
        <Route path="edit/:id" element={<InvoiceEdit />} />

        <Route path="*" element={<Navigate to="/invoices" replace />} />
      </Route>
    </Routes>
  );
};
