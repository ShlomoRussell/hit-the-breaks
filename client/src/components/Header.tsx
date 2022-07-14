import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import MenuDropdown from "./MenuDropdown";

function Header(): JSX.Element {
  return (
    <Navbar sticky="top" style={{ backgroundColor: "#1a63a1" }}>
      <Container fluid>
        <Navbar.Brand to={"/"} as={Link}>
          <div style={{ height: "4rem", width: "4rem" }}>
            <Image
              src="/images/logo.png"
              alt="logo"
              roundedCircle
              style={{
                objectFit: "contain",
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
          <Nav.Link style={{ color: "whitesmoke" }} to={"/vacations"} as={Link}>
            Vacations
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={MenuDropdown} title="Menu" />
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
