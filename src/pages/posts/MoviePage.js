import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
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
    <Row className="my-5">
      <Col>
        <Image src={postData.image} className={styles.Image} />
      </Col>
      <Col>
        <p>{postData.genrer}</p>
        <p>{postData.created_at}</p>
        <p>{postData.content}</p>
        <h1>{postData.title}</h1>
      </Col>
    </Row>
  );
};

export default MoviePage;
