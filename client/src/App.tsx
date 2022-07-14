import {  Route, Routes } from "react-router-dom";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import { RequireAuth } from "./features/auth/RequireAuth";
import EditOrAddVacation from "./features/vacations/EditOrAddVacation";
import "./App.css";
import Reports from "./features/reports/Reports";
import VacationsList from "./features/vacations/VacationsList";
import VacationModal from "./features/vacations/VacationModal";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<RequireAuth />}>
        <Route path="/" element={<Layout />}>
          <Route path="/reports" element={<Reports />} />
          <Route path="/vacations/">
            <Route path="/vacations/" element={<VacationsList />}>
              <Route
                path="/vacations/:vacationId"
                element={<VacationModal />}
              />
            </Route>
            <Route
              path="/vacations/edit/:vacationId"
              element={<EditOrAddVacation />}
            />
            <Route
              path="/vacations/add/"
              element={<EditOrAddVacation />}
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
