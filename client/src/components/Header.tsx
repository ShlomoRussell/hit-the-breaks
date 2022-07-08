import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectIsAdmin } from "../features/auth/authSlice";
import MenuDropdown from "./MenuDropdown";

function Header(): JSX.Element {
   const isAdmin = useSelector(selectIsAdmin);
  return (
    <Navbar sticky="top" style={{ backgroundColor: "#1a63a1" }}>
      <Container fluid>
        <Navbar.Brand to={"/"} as={Link}>
          <div>
            <Image
              src="/logo7.png"
              roundedCircle
              style={{
                objectFit: "scale-down",
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link style={{ color: "whitesmoke" }} to={"/"} as={Link}>
            Home
          </Nav.Link>
          <Nav.Link style={{ color: "whitesmoke" }} to={""} as={Link}>
            Vacations
          </Nav.Link>
          {isAdmin && (
            <Nav.Link style={{ color: "whitesmoke" }} to={""} as={Link}>
              Reports
            </Nav.Link>
          )}
        </Nav>
        <Nav>
          <Nav.Link as={MenuDropdown} title="Menu" />
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
