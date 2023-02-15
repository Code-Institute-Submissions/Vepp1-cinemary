import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

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
    <Row>
      <Col lg={6}>
        <Image src={postData.image} />
      </Col>
    </Row>
  );
};

export default MoviePage;
