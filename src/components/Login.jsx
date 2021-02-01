import React, { useRef, useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const history = useHistory();

  const userLogin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Invalid Email/Password!");
    }
    setLoading(false);
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={userLogin}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="font-weight-bold">
                  Email address
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  size="lg"
                  placeholder="Enter email"
                  ref={emailRef}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className="font-weight-bold">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  size="lg"
                  placeholder="Password"
                  ref={passwordRef}
                />
              </Form.Group>

              <Button disabled={loading} variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">SignUp</Link>
        </div>
      </div>
    </Container>
  );
};

export default Login;
