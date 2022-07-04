import React, { useState } from "react";
import { Button, Image, Modal } from "react-bootstrap";
import { Vacations } from "./vacations.interface";
import { AiTwotoneLike, AiTwotoneDislike } from "react-icons/ai";
function VacationModal({
  setShow,
  show,
  currentVacation,
}: {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  currentVacation: Vacations;
}) {
  const [isErr, setIsErr] = useState(false);
  return (
    <Modal
      onHide={() => setShow(false)}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {currentVacation.destination}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image
          onError={() => setIsErr(true)}
          fluid
          src={
            isErr || !currentVacation.picture
              ? "placeholder-image.png"
              : currentVacation.picture
          }
          alt=""
        />

        <p>{currentVacation.description}</p>
        <hr />
        <div>
          Begin: {new Date(currentVacation.startDate).toLocaleString()}
          <br />
          End: {new Date(currentVacation.endDate).toLocaleString()}
          <AiTwotoneLike />
          <AiTwotoneDislike />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default VacationModal;
