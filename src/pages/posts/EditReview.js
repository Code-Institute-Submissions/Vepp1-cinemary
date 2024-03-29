import React, { useEffect, useRef, useState } from "react";

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

import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate, useParams } from "react-router-dom";

const EditReview = () => {
  const [postData, setPostData] = useState({
    title: "",
    genre: "",
    content: "",
    image: "",
    director: "",
    actors: "",
    release_at: "",
  });

  const imageUpload = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
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
    formData.append("actors", postData.actors);
    formData.append("release_at", postData.release_at);

    if (imageUpload?.current?.files[0]) {
      formData.append("image", imageUpload.current.files[0]);
    }

    try {
      await axiosReq.patch(`/posts/${id}`, formData);
      setAlert('Review Updated');
        setTimeout(() => {
          navigate('/');
        }, 2000);
    } catch (error) {
      setErrors(error.response?.data);
    }
  };

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}`);
        const { title, content, genre, image, is_owner, director, release_at, actors } = data;

        is_owner
          ? setPostData({ title, content, image, genre, director, release_at, actors })
          : navigate("/");
      } catch (error) {
        console.log(error.response?.data);
        navigate("/");
      }
    };

    handleMount();
  }, [navigate, id]);

  return (
    <Row className={`pt-5 ${styles.Row}`}>
      <Col className="my-auto mx-auto pt-5" md="8">
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>Edit Review</h1>

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
                as="select"
                placeholder="Genre"
                name="genre"
                className={styles.Input}
                value={postData.genre}
                onChange={handleChange}
              > 
                <option value='Action'>Action</option>
                <option value='Adventure'>Adventure</option>
                <option value='Cartoon'>Cartoon</option>
                <option value='Comedy'>Comedy</option>
                <option value='Cult'>Cult</option>
                <option value='Drama'>Drama</option>
                <option value='Historical'>Historical</option>
                <option value='Horror'>Horror</option>
                <option value='Musical'>Musical</option>
                <option value='Sci-FI'>Sci-Fi</option>
                <option value='Terror'>Terror</option>
                <option value='Western'>Western</option>
              </Form.Control>
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

            <Form.Group className="mb-3" controlId="actors">
              <Form.Label>Actors</Form.Label>
              <Form.Control
                type="text"
                placeholder="Actors"
                name="actors"
                className={styles.Input}
                value={postData.actors}
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
            {errors.release_at?.map((message, idx) => (
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
            {alert ? (
                <Alert variant="success">
                  {alert}
                </Alert>
              ) : null}
            <Form.Group controlId="image" className="mb-3">
              <div>
                <Form.Label>Change Upload</Form.Label>
              </div>
              <figure>
                <Image className={appStyles.Image} src={postData.image} />
              </figure>

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

            <Button variant="warning" type="submit">
              Update
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

export default EditReview;
