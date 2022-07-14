import React, { useEffect, useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import { Vacations } from "./vacations.interface";
import history from "history/browser";

type ModalOutletContextType = {
  modalShow: boolean;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  currentVacation: Vacations;
};

export default function Vacation({
  currentVacation,
}: {
  currentVacation: Vacations;
}) {
  const [isErr, setIsErr] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    const unlisten = history.listen(({ action, location }) => {
      if (action == "POP" && location.pathname == `/vacations/${currentVacation.id}`) {
        setModalShow(true);
      }
    });
    if (history.location.pathname == `/vacations/${currentVacation.id}`) {
      setModalShow(true);
    }
    return () => unlisten();
  }, [history, setModalShow]);
  return (
    <>
      <Outlet context={{ modalShow, setModalShow, currentVacation }} />
      <Col>
        <Card>
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
                  ? "/images/placeholder-image.png"
                  : `/images/${currentVacation.picture}`
              }
            />
            <Card.Body>
              <Card.Title>{currentVacation.destination}</Card.Title>
     
            </Card.Body>
          </Link>
        </Card>
      </Col>
    </>
  );
}

export function useModalOutletContext() {
  return useOutletContext<ModalOutletContextType>();
}
