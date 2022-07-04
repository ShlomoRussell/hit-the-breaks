import React, { useEffect } from "react";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectAllVacations } from "./usersVacationsSlice";
import {
  useGetAllVacationsQuery,
  useGetVacationFollowersQuery,
} from "./userVacationsApiSlice";
import Vacation from "./Vacation";
import { Vacations } from "./vacations.interface";

function VacationsList() {
  const vacations= useSelector(selectAllVacations)
  const { data: followers } = useGetVacationFollowersQuery(
    "572ea218-f620-11ec-9eb8-c025a57d8af5"
  );
  
  return (
    <Row xs={1} md={3} className="g-4 m-3">
      {vacations && vacations.map((v: Vacations) => (
        <Vacation key={v.id} currentVacation={v} />
      ))}
    </Row>
  );
}

export default VacationsList;
