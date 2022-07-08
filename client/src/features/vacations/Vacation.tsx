import React, { useEffect, useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import {
  Link,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import VacationModal from "./VacationModal";
import { Vacations } from "./vacations.interface";
import history from "history/browser";

function Vacation({ currentVacation }: { currentVacation: Vacations }) {
  const [isErr, setIsErr] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    const unlisten = history.listen(({ action, location }) => {
      if (action == "POP" && location.pathname == `/${currentVacation.id}`) {
        setModalShow(true);
      }
    });
    if (history.location.pathname == `/${currentVacation.id}`) {
      setModalShow(true);
    }
    return () => unlisten();
  }, [history, setModalShow]);
  return (
    <>
      <Col>
        <Card
        /*  style={{
            backgroundColor: "white",
            boxShadow: "10px 10px 10px #888888",
            borderRadius: "10px",
          }} */
        >
          <Link
            title={currentVacation.destination}
            onClick={() => setModalShow(true)}
            to={`${currentVacation.id}`}
            className="list-group-item lh-tight w-100 align-self-center"
          >
            <Card.Img
              variant="top"
              onError={(e) => setIsErr(true)}
              src={
                isErr || !currentVacation.picture
                  ? "/placeholder-image.png"
                  : `/${currentVacation.picture}`
              }
            />
            <Card.Body>
              <Card.Title>{currentVacation.destination}</Card.Title>
              <Card.Text>{currentVacation.description}</Card.Text>
            </Card.Body>
          </Link>
        </Card>
      </Col>
      <Routes>
        <Route
          path="/:vacation"
          element={
            <VacationModal
              show={modalShow}
              setShow={setModalShow}
              currentVacation={currentVacation}
            />
          }
        />
      </Routes>
    </>
  );
}

export default Vacation;
