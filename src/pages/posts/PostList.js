import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import { Col, Row, Container, Form } from "react-bootstrap";
import Movie from "./Movie";

const PostList = (message) => {
  const [posts, setPosts] = useState({ results: [] });
  const { pathname } = useLocation();
  const [hasLoad, setHasLoad] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?search=${query}`);
        setPosts(data);
        setHasLoad(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoad(false);
    fetchPosts();
  }, [pathname, query]);

  return (
    <>
      <Form onSubmit={(event) => event.preventDefault()}>
        <Form.Control
          type="text"
          className="mr-sm-2"
          placeholder="Search reviews"
          onChange={(event) => setQuery(event.target.value)}
        />
      </Form>
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
