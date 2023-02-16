import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Comments from "../../components/Comments";
import styles from "../../styles/MoviePage.module.css";

const MoviePage = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState({
    title: "",
    genrer: "",
    content: "",
    image: "",
    owner: "",
    created_at: "",
    updated_at: "",
  });

  useEffect(() => {
    const handleMount = async (event) => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}`);
        const { title, content, genrer, image, owner, created_at, updated_at } =
          data;
        setPostData({
          title,
          content,
          genrer,
          image,
          owner,
          created_at,
          updated_at,
        });
      } catch (error) {
        console.log(error);
      }
    };
    handleMount();
  }, [id]);

  return (
    <Container className="my-5">
      <Row className="text-justify">
        <Col>
          <Image src={postData.image} className={styles.Image} />
        </Col>
        <Col>
          <h1 className="my-3">{postData.title}</h1>
          <p className="text-left">
            <strong>Genrer:</strong> {postData.genrer}
          </p>
          <p>{postData.content}</p>
          <p>
            Created by: <strong>{postData.owner}</strong> on{" "}
            {postData.created_at}
          </p>
        </Col>
        <Col>
          <Comments />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
