import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import appStyles from "../../App.module.css";

import { Col, Row, Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useSetCurrentUser } from "../../context/CurrentUserContext";
import { setTokenTimestamp } from "../../utils/utils";

const CreatePost = () => {
  const setCurrentUser = useSetCurrentUser();

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();

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
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>Create Post</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                className={styles.Input}
                value={signInData.username}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="genrer">
              <Form.Label>Genrer</Form.Label>
              <Form.Control
                type="text"
                placeholder="genrer"
                name="genrer"
                className={styles.Input}
                value={signInData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                placeholder="Content"
                name="content"
                className={styles.Input}
                value={signInData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Default file input example</Form.Label>
              <Form.Control type="file" id="image" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Create
            </Button>
          </Form>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      ></Col>
    </Row>
  );
};

export default CreatePost;
