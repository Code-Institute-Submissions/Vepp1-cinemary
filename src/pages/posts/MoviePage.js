import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../context/CurrentUserContext";
import styles from "../../styles/MoviePage.module.css";
import Comments from "../comments/Comments";
import CommentsCreate from "../comments/CommentsCreate";

const MoviePage = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState({ results: [] });
  const [comments, setComments] = useState({ results: [] });
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async (event) => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        const { title, content, genrer, image, owner, created_at, updated_at } =
          post;
        setPostData({
          title,
          content,
          genrer,
          image,
          owner,
          created_at,
          updated_at,
        });
        setComments(comments);
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
          <CommentsCreate
            post={id}
            setPostData={setPostData}
            setComments={setComments}
          />
          {comments.results.length ? (
            comments.results.map((comment) => (
              <Comments
                key={comment.id}
                {...comment}
                setPost={setPostData}
                setComments={setComments}
              />
            ))
          ) : (
            <p>none</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
