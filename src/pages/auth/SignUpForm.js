import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import appStyles from "../../App.module.css";

import {
  Col,
  Row,
  Container,
  Form,
  Button,
  NavLink,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";

const SignUpForm = () => {
  useRedirect("loggedIn");
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      setTimeout(() => {
        navigate("/signin");
      }, 1500)
      setAlert('Account Created');
    } catch (error) {
      setErrors(error.response?.data);
    }
  };

  return (
    <Container className="pt-5">
      {alert ? (
                <Alert variant="success">
                  {alert}
                </Alert>
              ) : null}
      <Row className={styles.Row}>
        <Col className="mx-auto my-auto" md="8">
          <Container className={`${appStyles.Content} p-4 `}>
            <h1 className={styles.Header}>sign up</h1>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  className={styles.Input}
                  value={username}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.username?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}

              <Form.Group className="mb-3" controlId="password1">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password1"
                  className={styles.Input}
                  value={password1}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.password1?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}

              <Form.Group className="mb-3" controlId="password2">
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password2"
                  className={styles.Input}
                  value={password2}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.password2?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}

              {errors.non_field_errors?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}

              <Button variant="success" type="submit">
                Sign Up
              </Button>
            </Form>
          </Container>
          <Container className={`mt-3 ${appStyles.Content}`}>
            <NavLink className={styles.Link} href="/signin">
              Already have an account? <span>Sign in</span>
            </NavLink>
          </Container>
        </Col>
        <Col
          md={6}
          className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
        ></Col>
      </Row>
    </Container>
  );
};

export default SignUpForm;
