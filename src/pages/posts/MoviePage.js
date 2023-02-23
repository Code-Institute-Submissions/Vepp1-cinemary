import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../context/CurrentUserContext";
import styles from "../../styles/MoviePage.module.css";
import Comments from "../comments/Comments";
import CommentsCreate from "../comments/CommentsCreate";

const MoviePage = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState({ results: [] });
  const [comments, setComments] = useState({ results: [] });
  const [hasLoad, setHasLoad] = useState(false);
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
        setHasLoad(true);
      } catch (error) {
        console.log(error);
      }
    };
    setHasLoad(false);
    handleMount();
  }, [id]);

  return (
    <>
      {hasLoad ? (
        <Container className="mt-5 pt-5">
          <Row className="text-justify">
            <Col>
              <Image src={postData.image} className={styles.Image} />
            </Col>
            <Col>
              <h1>{postData.title}</h1>
              <p className="text-left">
                <strong>Genrer:</strong> {postData.genrer}
              </p>
              <p>{postData.content}</p>
              <p>
                Created by: <strong>{postData.owner}</strong> on{" "}
                {postData.created_at}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              {currentUser ? (
                <CommentsCreate
                  post={id}
                  setPostData={setPostData}
                  setComments={setComments}
                />
              ) : null}

              {comments.results.length ? (
                comments.results.map((comment) => (
                  <Comments
                    key={comment.id}
                    {...comment}
                    postData={postData}
                    setPostData={setPostData}
                    setComments={setComments}
                  />
                ))
              ) : (
                <p className="py-5">No comments yet!</p>
              )}
            </Col>
          </Row>
        </Container>
      ) : (
        <Container className="mt-5">
          <Asset spinner />
        </Container>
      )}
    </>
  );
};

export default MoviePage;
