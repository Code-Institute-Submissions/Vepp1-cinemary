import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import { Col, Container, Row } from "react-bootstrap";
import Movie from "./Movie";

const PostList = () => {
  const [posts, setPosts] = useState({ results: [] });
  const { pathname } = useLocation();
  const [hasLoad, setHasLoad] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get("/posts/");
        setPosts(data);
        setHasLoad(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [pathname]);

  return (
    <>
      <Row>
        {hasLoad ? (
          <>
            {posts.results?.map((post) => (
              <Col>
                <Movie key={post.id} {...post} setPosts={setPosts} />
              </Col>
            ))}
          </>
        ) : (
          <Container>
            <Asset spinner />
          </Container>
        )}
      </Row>
    </>
  );
};

export default PostList;
