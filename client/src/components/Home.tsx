import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../app/hooks";
import { store } from "../app/store";

import usersVacationsApi, {
  useGetAllVacationsQuery,
} from "../features/vacations/userVacationsApiSlice";
import { Vacations } from "../features/vacations/vacations.interface";
import VacationsList from "../features/vacations/VacationsList";
import Header from "./Header";

function Home() {
  const { isLoading } = useGetAllVacationsQuery([]);
  return (
    <div style={{ backgroundColor: "#f0f2f5" }}>
      <Header />
      {isLoading ? (
        <div className="position-relative vh-100">
          <Spinner
            animation="border"
            className="position-absolute top-50 start-50 translate-middle"
            role="status"
            variant="info"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <VacationsList />
      )}
    </div>
  );
}

export default Home;
