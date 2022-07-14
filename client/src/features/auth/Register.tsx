import React, { useRef, useEffect, useState } from "react";
import { Form, Button, Alert, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";

function Register() {
  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLDivElement>(null);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState('')
  const [lastName,setLastName]=useState('')
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [register] = useRegisterMutation();
  let navigate = useNavigate();
  let location = useLocation();
  const dispatch = useDispatch();
  let from = (location.state as any)?.from?.pathname || "/";
const isMobile=window.innerWidth< 800
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const credentials = {
       email,
      username,
      firstName,
      lastName,
      password,
      confirmPassword
    };
    try {
      const userData = await register(credentials).unwrap();
      dispatch(setCredentials(userData));
      navigate(from, { replace: true });
    } catch (error: any) {
      if (!error?.originalStatus) setErrMsg("Having trouble connecting to server please try again!");
      else setErrMsg(error.data);
      errRef.current?.focus();
    }
  };

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  return (
    <div className="container ">
      <div className="row vh-100 align-items-center">
        <div
          style={{
            backgroundColor: "white",
            boxShadow: "10px 10px 10px #888888",
            borderRadius: "10px",
          }}
          className="mx-auto p-5 pt-1 col-sm-4"
        >
          <Image
            className="mb-4 mx-auto d-block"
            fluid
            src="/images/hit_the_breaks.png"
          />
          {errMsg && (
            <Alert
              variant={"warning"}
              ref={errRef}
              style={{ textTransform: "capitalize" }}
            >
              {errMsg}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="'John Doe'"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="'John'"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="last name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="'Doe'"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Group>
            <Button
              className="w-100 mt-4 border-0"
              style={{
                width: "85%",
                display: "block",
                backgroundColor: "#48b42c",
              }}
              variant="primary"
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
