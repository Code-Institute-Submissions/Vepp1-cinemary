import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import appStyles from "../../App.module.css";

import { Col, Row, Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const ChangePassword = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { password1, password2 } = signUpData;
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

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
      navigate("/signin");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="mx-auto my-auto" md="8">
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>Update Password</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="password1">
              <Form.Label>New Password</Form.Label>
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

            <Button variant="danger" type="submit">
              Save
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default ChangePassword;
