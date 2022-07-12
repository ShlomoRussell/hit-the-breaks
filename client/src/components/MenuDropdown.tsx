import { Dropdown, Nav } from "react-bootstrap";
import { forwardRef } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useAppDispatch } from "../app/hooks";
import { logOut, selectIsAdmin } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CustomToggle = forwardRef(
  (
    { onClick }: { onClick: React.MouseEventHandler<HTMLElement> },
    ref
  ): JSX.Element => (
    <Nav.Link
      style={{ color: "whitesmoke" }}
      title="Menu"
      className="m-1"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <BsThreeDots className="mx-auto " />
    </Nav.Link>
  )
);

function MenuDropdown() {
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(logOut(null));
  };
     const isAdmin = useSelector(selectIsAdmin);

  return (
    <Dropdown drop="start" className="d-inline" autoClose="outside">
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />

      <Dropdown.Menu align="start">
        <Dropdown.Item eventKey="1">Profile</Dropdown.Item>
        <Dropdown.Item eventKey="2">My Vacations</Dropdown.Item>
        {isAdmin && (
          <>
            <Dropdown.Item to={"/reports"} as={Link} eventKey="3">
              Reports
            </Dropdown.Item>
            <Dropdown.Item to={"/vacations/add"} as={Link} eventKey="3">
              Add Vacation
            </Dropdown.Item>
          </>
        )}
        <Dropdown.Item eventKey="4" title="Log out" onClick={handleLogOut}>
          Log out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default MenuDropdown;
