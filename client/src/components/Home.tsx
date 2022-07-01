import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../app/hooks";
import { store } from "../app/store";
import { selectCurrentToken } from "../features/auth/authSlice";
import usersVacationsApi, {
  useGetAllVacationsQuery,
} from "../features/vacations/userVacationsApiSlice";
import { Vacations } from "../features/vacations/vacations.interface";
import VacationsList from "../features/vacations/VacationsList";

function Home() {
  const dispatch = useAppDispatch();
  const token = useSelector(selectCurrentToken)
  if (token) dispatch(usersVacationsApi.endpoints.getAllVacations.initiate([]));

  return <><VacationsList/></>;
}

export default Home;
