import React, { useState } from "react";
import { Button, Card, Col, Placeholder } from "react-bootstrap";
import VacationModal from "./VacationModal";
import { Vacations } from "./vacations.interface";

function Vacation({ currentVacation }: { currentVacation: Vacations }) {
  const [isErr, setIsErr] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Col>
        <Card
          style={{
            backgroundColor: "white",
            boxShadow: "10px 10px 10px #888888",
            borderRadius: "10px",
          }}
        >
          <Button
            onClick={() => setModalShow(true)}
            variant="link"
            className="list-group-item lh-tight w-100 align-self-center"
          >
            <Card.Img
              variant="top"
              onError={(e) => setIsErr(true)}
              src={
                isErr || !currentVacation.picture
                  ? "placeholder-image.png"
                  : currentVacation.picture
              }
            />
            <Card.Body>
              <Card.Title>{currentVacation.destination}</Card.Title>
              <Card.Text>{currentVacation.description}</Card.Text>
            </Card.Body>
          </Button>
        </Card>
      </Col>
      <VacationModal
        show={modalShow}
        setShow={setModalShow}
        currentVacation={currentVacation}
      />
    </>
  );
}

export default Vacation;
