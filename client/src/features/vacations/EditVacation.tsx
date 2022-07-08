import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { selectIsAdmin } from "../auth/authSlice";
import { selectAllVacations } from "./usersVacationsSlice";

function EditVacation() {
  const { vacationid } = useParams();
  const vacations = useSelector(selectAllVacations);
    const currentVacation = vacations.find((v) => v.id == vacationid);
    console.log(vacationid)
  const isAdmin = useSelector(selectIsAdmin);

/*   if (isAdmin) */ return <div>{currentVacation?.description}</div>;
  //else return <Navigate to={"/"} replace />;
}

export default EditVacation;
