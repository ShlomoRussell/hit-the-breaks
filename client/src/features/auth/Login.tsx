import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Alert, Image } from "react-bootstrap";
import { Link, useNavigate, Navigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import { store } from "../../app/store";

function Login() {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [login, { data }] = useLoginMutation();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const dispatch = useAppDispatch();
  const location = useLocation();
  let from = (location.state as any)?.from?.pathname || "/";
  const token = store.getState().auth.token;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    const credentials = {
      email: emailRegex.test(user) ? user : undefined,
      username: !emailRegex.test(user) ? user : undefined,
      password: pwd,
    };
    try {
      const userData = await login(credentials).unwrap();
      dispatch(setCredentials(userData));
      console.log(userData)
      navigate(from, { replace: true });
    } catch (error: any) {
      console.log(error)
      if (!error?.originalStatus)
        setErrMsg("Having trouble connecting to server please try again!");
      else setErrMsg(error.data);
      errRef.current?.focus();
    }
  };
  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  if (token) return <Navigate to="/" state={{ from: location }} replace />;
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
        className="position-absolute top-50 start-50 translate-middle align-items-center p-5 pt-1 w-25 "
      >
        <Image className="mb-4 mx-auto d-block" fluid src="hit_the_breaks.png" />
        {errMsg ? (
          <Alert
            ref={errRef}
            className="text-wrap mx-auto"
            style={{ textTransform: "capitalize", borderRadius: "5px" }}
            variant={"warning"}
          >
            {errMsg}
          </Alert>
        ) : null}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username or Email</Form.Label>
            <Form.Control
              onChange={(e) => setUser(e.target.value)}
              ref={userRef}
              type="text"
              placeholder="Enter username or email"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => setPwd(e.target.value)}
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>

          <Button
            style={{ backgroundColor: "#48b42c" }}
            className="w-100 border-0"
            variant="primary"
            type="submit"
          >
            Login
          </Button>

          <Form.Group controlId="forgotPassword">
            <Form.Text className="text-muted">
              <Link className="text-decoration-none" to={""}>
                Forgot your password?
              </Link>
            </Form.Text>
          </Form.Group>
          <hr />
          <Link className="text-decoration-none" to={"/register"}>
            <Button
              style={{ backgroundColor: "#48b42c", display: "block" }}
              className="mx-auto border-0"
            >
              Sign up here
            </Button>
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
