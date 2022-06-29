import React, { useRef, useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";

function Register() {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLDivElement>(null);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState('')
  const [lastName,setLastName]=useState('')
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [register, { data }] = useRegisterMutation();
  let navigate = useNavigate();
  let location = useLocation();
  const dispatch = useDispatch();
  let from = (location.state as any)?.from?.pathname || "/";

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
      dispatch(setCredentials({ username, token: userData.token }));
      navigate(from, { replace: true });
    } catch (error: any) {
      if (!error?.response)
        setErrMsg(data);
      else setErrMsg(data);
      errRef.current?.focus();
    }
  };

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  return (
    <div
      style={{ backgroundColor: "#f0f2f5" }}
      className="position-relative vh-100 vw-100"
    >
      <div
        style={{
          backgroundColor: "white",
          boxShadow: "10px 10px 10px #888888",
          borderRadius: "10px",
        }}
        className="position-absolute top-50 start-50 translate-middle align-items-center p-4"
      >
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
              ref={userRef}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="'John Doe'"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              ref={userRef}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="'John'"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="last name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              ref={userRef}
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
            className="mx-auto my-4"
            style={{ width: "85%", display: "block" }}
            variant="primary"
            type="submit"
          >
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Register;
