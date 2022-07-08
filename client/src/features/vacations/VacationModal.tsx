import React, { useEffect, useRef, useState } from "react";
import { Button, Image, Modal } from "react-bootstrap";
import { Vacations } from "./vacations.interface";
import { Link, useLocation, useNavigate } from "react-router-dom";
import history from "history/browser";
import {
  useFollowMutation,
  useUnFollowMutation,
} from "./userVacationsApiSlice";
import FollowersAccordion from "./FollowersAccordion";
import { useSelector } from "react-redux";
import { selectIsAdmin } from "../auth/authSlice";

function VacationModal({
  setShow,
  show,
  currentVacation,
}: {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  currentVacation: Vacations;
}): JSX.Element {
  const [isErr, setIsErr] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
   const isAdmin = useSelector(selectIsAdmin);
  const navigate = useNavigate();

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
      if (action == "POP" && location.pathname == "/") {
        setShow(false);
      }
    });
    return () => unlisten();
  }, [history, setShow]);
  return (
    <Modal
      scrollable
      onHide={() => {
        navigate(-1);
        setShow(false);
      }}
      show={show}
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
              : `/${currentVacation.picture}`
          }
          alt={`picture of ${currentVacation.destination}`}
        />
        {isAdmin ? (
          <Link to={`/edit/${currentVacation.id}`} >
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
          {currentVacation.description} Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Iste assumenda illo, suscipit blanditiis beatae
          facere ea minus officia quo ex id minima atque nihil, harum adipisci
          magnam? Excepturi minima, dolor dignissimos modi nemo, molestiae
          fugiat facilis a porro quas expedita deleniti necessitatibus
          accusantium omnis culpa consectetur quisquam. Laborum distinctio optio
          eius est beatae repudiandae perferendis eum ea, dolore laudantium eos
          sint voluptate vero officiis similique, veniam, quae atque pariatur
          nihil fugit dolor. Suscipit facilis accusantium sit nisi dignissimos a
          earum impedit! Sunt totam delectus quisquam quas amet expedita debitis
          dolor, perferendis reprehenderit enim nobis temporibus, maxime fugiat
          at cum maiores.
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
