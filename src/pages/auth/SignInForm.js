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
  Alert,
  NavLink,
} from "react-bootstrap";
import axios from "axios";
import { useSetCurrentUser } from "../../context/CurrentUserContext";
import { setTokenTimestamp } from "../../utils/utils";
import { useRedirect } from "../../hooks/useRedirect";

const SignInForm = () => {
  useRedirect("loggedIn");
  const setCurrentUser = useSetCurrentUser();

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      navigate("/");
    } catch (error) {
      setErrors(error.response?.data);
    }
  };

  return (
    <Container className="pt-5">
      <Row className={styles.Row}>
        <Col className="mx-auto my-auto" md="8">
          <Container className={`${appStyles.Content} p-4 `}>
            <h1 className={styles.Header}>sign in</h1>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  className={styles.Input}
                  value={signInData.username}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors ? (
                <Alert variant="warning">
                  Username and Password didn't match!
                </Alert>
              ) : null}

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  className={styles.Input}
                  value={signInData.password}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="success" type="submit">
                Sign In
              </Button>
            </Form>
          </Container>

          <Container className={`mt-3 ${appStyles.Content}`}>
            <NavLink className={styles.Link} href="/signup">
              Don't have an account? <span>Sign up</span>
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

export default SignInForm;
