import React, { createRef } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
//import { useAuth } from "../context/AuthContext";

function Login({ token, onSubmitId, onSubmitToken }:{token:string,onSubmitId:Function,onSubmitToken:Function} ) {
  const usernameRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();

  let navigate = useNavigate();
  let location = useLocation();

 // let { signin, authError } = useAuth();

  let from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

 /*    signin(
      {
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      },
      onSubmitId,
      onSubmitToken,
      () => {
        navigate(from, { replace: true });
      }
    ); */
  };
  if (token) return navigate("/");
  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      {/* authError && <Alert variant={"warning"}>{authError}</Alert> */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            ref={usernameRef}
            type="text"
            placeholder="Enter username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={passwordRef}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <Form.Group className="mb-3" controlId="register">
          <Form.Text className="text-muted">
            Don't have an account yet?{" "}
            <Link to={"/register"}>Sign up here</Link>
          </Form.Text>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Login;
