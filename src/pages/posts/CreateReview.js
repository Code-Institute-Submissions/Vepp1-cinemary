import React, { useRef, useState } from "react";

import appStyles from "../../App.module.css";
import styles from "../../styles/SignInUpForm.module.css";

import {
  Col,
  Row,
  Container,
  Form,
  Button,
  Image,
  Alert,
} from "react-bootstrap";

import { axiosRes } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";
import { useNavigate } from "react-router-dom";

const CreateReview = () => {
  useRedirect("loggedOut");
  const [postData, setPostData] = useState({
    title: "",
    genre: "",
    content: "",
    image: "",
    director: "",
    release_at: "",
  });
  const navigate = useNavigate();

  const imageUpload = useRef(null);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState();

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(postData.image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", postData.title);
    formData.append("genre", postData.genre);
    formData.append("content", postData.content);
    formData.append("director", postData.director);
    formData.append("release_at", postData.release_at);
    formData.append("image", imageUpload.current.files[0]);

    try {
      await axiosRes.post("/posts/", formData);
      setAlert('Review Created');
        setTimeout(() => {
          navigate('/');
        }, 1500);
    } catch (error) {
      setErrors(error.response?.data);
    }
  };

  return (
    <Row className={`pt-5 ${styles.Row}`}>
      <Col className="my-auto mx-auto pt-5" md="8">
      {alert ? (
                <Alert variant="success">
                  {alert}
                </Alert>
              ) : null}
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>Create Review</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                className={styles.Input}
                value={postData.title}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.title?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Form.Group className="mb-3" controlId="genre">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Genre"
                name="genre"
                className={styles.Input}
                value={postData.genre}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.genre?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Form.Group className="mb-3" controlId="director">
              <Form.Label>Director</Form.Label>
              <Form.Control
                type="text"
                placeholder="Director"
                name="director"
                className={styles.Input}
                value={postData.director}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.director?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Form.Group className="mb-3" controlId="release_at">
              <Form.Label>Release Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="release_at"
                name="release_at"
                className={styles.Input}
                value={postData.release_at}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.genre?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Form.Group className="mb-3" controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={15}
                placeholder="Content"
                name="content"
                className={styles.Input}
                value={postData.content}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.content?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Form.Group controlId="image" className="mb-3">
              {postData.image ? (
                <>
                  <div>
                    <i className={` ${styles.Upload} fa-solid fa-upload`} />
                    <Form.Label>Change Upload</Form.Label>
                  </div>
                  <figure>
                    <Image className={appStyles.Image} src={postData.image} />
                  </figure>
                </>
              ) : (
                <>
                  <Form.Label>
                    <i className={` ${styles.Upload} fa-solid fa-upload`} />
                    Upload Image 
                    <br></br>
                     <em>2mb, height &#62; 1000 x width &#60; 2000</em>
                  </Form.Label>
                </>
              )}

              <Form.Control
                type="file"
                accept="image/*"
                ref={imageUpload}
                onChange={handleImage}
              />
            </Form.Group>
            {errors.image?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Button variant="info" type="submit">
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

export default CreateReview;
