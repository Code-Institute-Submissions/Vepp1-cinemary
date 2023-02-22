import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import { Col, Row, Container, Form } from "react-bootstrap";
import Movie from "./Movie";
import styles from "../../styles/MovieList.module.css";

const MovieList = () => {
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
      <Row>
        <Col sm={10} className="offset-1 pt-5">
          <Form
            onSubmit={(event) => event.preventDefault()}
            className={`pt-5 ${styles.SearchBar}`}
          >
            <Form.Control
              type="text"
              className="mr-sm-2 text-center"
              placeholder="Search reviews by title, genrer or author username"
              onChange={(event) => setQuery(event.target.value)}
            />
          </Form>
        </Col>
      </Row>
      <Row>
        {hasLoad ? (
          <>
            {posts.results.length ? (
              posts.results.map((post) => (
                <Col>
                  <Movie key={post.id} {...post} setPosts={setPosts} />
                </Col>
              ))
            ) : (
              <Container>
                <Asset message />
              </Container>
            )}
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

export default MovieList;
