import { Modal, Button } from "react-bootstrap";
import { useAppDispatch } from "../../app/hooks";
import { setVacationIsUpdated } from "../../services/socket/updateSlice";
import usersVacationsApi from "./userVacationsApiSlice";

function UpdateAlertModal({
  show,
  setShow,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();
  const handleUpdates = () => {
      const { refetch}=dispatch(usersVacationsApi.endpoints.getAllVacations.initiate([]));
  refetch()
    handleClose();
  };
  const handleClose = () => {
    dispatch(setVacationIsUpdated(false));
    setShow(false);
  };
  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Yay!!</Modal.Title>
      </Modal.Header>
      <Modal.Body>We have some updates for you!!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Stay as is
        </Button>
        <Button variant="primary" onClick={handleUpdates}>
          View Updates
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateAlertModal;
