import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectVacationsIsUpdated } from "../../services/socket/updateSlice";
import UpdateAlertModal from "./UpdateAlertModal";
import { selectAllVacations } from "./usersVacationsSlice";
import Vacation from "./Vacation";
import { Vacations } from "./vacations.interface";

function VacationsList() {
  const vacations = useSelector(selectAllVacations);
  const [show, setShow] = useState(false);
  const vacationsIsUpdated = useSelector(selectVacationsIsUpdated);
  useEffect(() => {
    if (vacationsIsUpdated) {
      setShow(true);
    }
  }, [vacationsIsUpdated, setShow]);
  return (
    <>
      <UpdateAlertModal show={show} setShow={setShow} />
      <Row xs={1} md={3} className="g-4 m-3">
        {vacations &&
          vacations.map((v: Vacations) => (
            <Vacation key={v.id} currentVacation={v} />
          ))}
      </Row>
    </>
  );
}

export default VacationsList;
