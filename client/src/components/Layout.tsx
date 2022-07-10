import { Outlet, useLocation } from "react-router-dom";
import { useGetAllVacationsQuery } from "../features/vacations/userVacationsApiSlice";
import Header from "./Header";
import Home from "./Home";

function Layout() {
  const {  isError } = useGetAllVacationsQuery([]);
  const location = useLocation();
  return (
    <div className="h-100 ">
      <Header />
      { isError && (
    <div className="position-absolute top-50 start-50 translate-middle text-center">
      We seem to be having a hard time connecting to the server please try
      again!
    </div>)}
      {location.pathname === "/" ? <Home /> : <Outlet />}
    </div>
  );
}

export default Layout;
