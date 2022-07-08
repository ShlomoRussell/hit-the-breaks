import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectAllVacations } from "./usersVacationsSlice";
import Vacation from "./Vacation";
import { Vacations } from "./vacations.interface";

function VacationsList() {
  const vacations = useSelector(selectAllVacations);
  

  return (
    <Row xs={1} md={3} className="g-4 m-3">
      {vacations &&
        vacations.map((v: Vacations) => (
          <Vacation key={v.id} currentVacation={v} />
        ))}
    </Row>
  );
}

export default VacationsList;
