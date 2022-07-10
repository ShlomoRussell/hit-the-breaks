import React, { useEffect, useState } from "react";
import { Button, Image, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import history from "history/browser";
import {
  useFollowMutation,
  useUnFollowMutation,
} from "./userVacationsApiSlice";
import FollowersAccordion from "./FollowersAccordion";
import { useSelector } from "react-redux";
import { selectIsAdmin } from "../auth/authSlice";
import { useModalOutletContext } from "./Vacation";

function VacationModal(): JSX.Element {
  const [isErr, setIsErr] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const isAdmin = useSelector(selectIsAdmin);
  const navigate = useNavigate();
  const { modalShow, setModalShow, currentVacation } = useModalOutletContext()
  const [follow] = useFollowMutation();
  const [unFollow] = useUnFollowMutation();

  const handleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      if (isFollowed) {
        await unFollow(currentVacation.id);
      } else await follow(currentVacation.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unlisten = history.listen(({ action, location }) => {
      if (action ===  "POP" && location.pathname === "/vacations") {
        setModalShow(false);
      }
    });
    return () => unlisten();
  }, [ setModalShow]);
  return (
    <Modal
      scrollable
      onHide={() => {
        navigate(-1);
        setModalShow(false);
      }}
      show={modalShow}
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
              ? "/placeholder-image.png"
              : `/images/${currentVacation.picture}`
          }
          alt={`picture of ${currentVacation.destination}`}
        />
        {isAdmin ? (
          <Link to={`/vacations/edit/${currentVacation.id}`}>
            <Button
              size="sm"
              style={{ backgroundColor: "#48b42c" }}
              className="float-end m-1 border-0"
            >
              Edit
            </Button>
          </Link>
        ) : (
          <Button
            size="sm"
            style={{ backgroundColor: "#48b42c" }}
            className="float-end m-1 border-0"
            onClick={handleFollow}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
        )}
        <p className="m-1">
          {currentVacation.description}
        </p>
        <hr />
        <div className="d-flex justify-content-between">
          <div>
            <h5> Begins: </h5>
            {new Date(currentVacation.startDate).toLocaleString()}
          </div>
          <div>
            <h5>Ends:</h5> {new Date(currentVacation.endDate).toLocaleString()}
          </div>
        </div>
        <hr />
        {!isAdmin && (
          <div>
            <FollowersAccordion
              setIsFollowed={setIsFollowed}
              id={currentVacation.id}
            />
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default VacationModal;
