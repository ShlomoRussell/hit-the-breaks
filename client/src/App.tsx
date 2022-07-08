import { Route, Routes } from "react-router-dom";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Home from "./components/Home";
import { RequireAuth } from "./features/auth/RequireAuth";
import EditVacation from "./features/vacations/EditVacation";

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/edit/:vacationid" element={<EditVacation />} />
      <Route
        path="/*"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      ></Route>
    </Routes>
  );
}

export default App;
