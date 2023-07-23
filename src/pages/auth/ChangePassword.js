import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import appStyles from "../../App.module.css";

import { Col, Row, Container, Form, Button, Alert } from "react-bootstrap";
import { useRedirect } from "../../hooks/useRedirect";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../context/CurrentUserContext";

const ChangePassword = () => {
  useRedirect("loggedOut");
  const navigate = useNavigate();
  const { id } = useParams();
  const currentUser = useCurrentUser();

  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;
  const [alert, setAlert] = useState();

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      setAlert('Password Updated');
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (error) {
      setErrors(error.response?.data);
    }
  };

  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      navigate(-1);
    }
  }, [currentUser, navigate, id]);

  return (
    <Row className={styles.Row}>
      <Col className="mx-auto my-auto" md="8">
      {alert ? (
                <Alert variant="success">
                  {alert}
                </Alert>
              ) : null}
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>Update Password</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="password1">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="new_password1"
                className={styles.Input}
                value={new_password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.new_password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Form.Group className="mb-3" controlId="password2">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="new_password2"
                className={styles.Input}
                value={new_password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.new_password2?.map((message, idx) => (
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
