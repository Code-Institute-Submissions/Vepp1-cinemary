import React, { useEffect, useRef, useState } from "react";

import appStyles from "../../App.module.css";
import styles from "../../styles/SignInUpForm.module.css";

import { Col, Row, Container, Form, Button, Image } from "react-bootstrap";

import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const [postData, setPostData] = useState({
    title: "",
    genrer: "",
    content: "",
    image: "",
  });

  const imageUpload = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

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
    formData.append("genrer", postData.genrer);
    formData.append("content", postData.content);

    if (imageUpload?.current?.files[0]) {
      formData.append("image", imageUpload.current.files[0]);
    }

    try {
      await axiosReq.patch(`/posts/${id}`, formData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}`);
        const { title, content, genrer, image, is_owner } = data;

        is_owner
          ? setPostData({ title, content, image, genrer })
          : navigate("/");
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    };

    handleMount();
  }, [navigate, id]);

  return (
    <Row className={styles.Row}>
      <Col className="my-auto mx-auto pt-5" md="8">
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
                value={postData.title}
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
                value={postData.genrer}
                onChange={handleChange}
              />
            </Form.Group>

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

export default EditPost;
