import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import appStyles from "../../App.module.css";

import { Col, Row, Container, Form, Button, Alert } from "react-bootstrap";
import { useRedirect } from "../../hooks/useRedirect";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { useSetCurrentUser } from "../../context/CurrentUserContext";

const ChangeUsername = () => {
  useRedirect("loggedOut");
  const navigate = useNavigate();
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const [username, setUsername] = useState("");;

  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        await axiosRes.put("/dj-rest-auth/user/", {
            username,
          });
        setCurrentUser((prevUser) => ({
            ...prevUser,
            username,
        }));
        navigate(-1)
    } catch (error) {
      setErrors(error.response?.data);
    }
  };

  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      navigate(-1);
    } else {
        setUsername(currentUser.username)
    }
  }, [currentUser, navigate, id]);

  return (
    <Row className={styles.Row}>
      <Col className="mx-auto my-auto" md="8">
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>Update Username</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="password1">
              <Form.Label>Change Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="username"
                name="username"
                className={styles.Input}
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
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

export default ChangeUsername;
