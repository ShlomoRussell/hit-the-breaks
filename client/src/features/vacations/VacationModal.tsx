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
      scrollable
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
        <div className="d-flex justify-content-between">
          <div>
            <h5> Begin: </h5>
            {new Date(currentVacation.startDate).toLocaleString()}
          </div>
          <div>
            <h5>End:</h5> {new Date(currentVacation.endDate).toLocaleString()}
          </div>
          <div className="align-self-center">
            <span
              title="like"
              onMouseEnter={(e) => (e.currentTarget.style.color = "blue")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "black")}
            >
              <AiTwotoneLike style={{ width: "1.5rem", height: "1.5rem" }} />
            </span>
            <span
              title="dislike"
              onMouseEnter={(e) => (e.currentTarget.style.color = "blue")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "black")}
            >
              <AiTwotoneDislike style={{ width: "1.5rem", height: "1.5rem" }} />
            </span>
          </div>
        </div>
        <hr />
        <div>Comments:</div>
      </Modal.Body>
    </Modal>
  );
}

export default VacationModal;
