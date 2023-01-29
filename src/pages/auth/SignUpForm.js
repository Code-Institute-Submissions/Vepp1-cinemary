import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import appStyles from "../../App.module.css";

import { Col, Row, Container, Form, Button, NavLink } from "react-bootstrap";
import axios from "axios";

const SignUpForm = () => {
    const [signUpData, setSignUpData] = useState({
        username: '',
        password1: '',
        password2: '',
    })
    const {username, password1, password2} = signUpData
    const history = useHistory();

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await axios.post("/dj-rest-auth/registration/", signUpData);
        history.push("/signin");
      } catch (err) {
        console.log(err)
      }
    };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign up</h1>

        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" 
                name="username" className={styles.Input}
                value={username} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password1">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" 
                name="password1" className={styles.Input}
                value={password1} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password2">
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control type="password" placeholder="Password" 
                name="password2" className={styles.Input}
                value={password2} onChange={handleChange} />
            </Form.Group>
            
            <Button variant="primary" type="submit">
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
      >
      </Col>
    </Row>
  );
};

export default SignUpForm;