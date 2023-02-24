import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import { Col, Row, Container, Form } from "react-bootstrap";
import Movie from "./Movie";
import styles from "../../styles/MovieList.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

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
        {hasLoad ? (
          <>
            {posts.results.length ? (
              <Container fluid>
                <InfiniteScroll
                  children={posts.results.map((post) => (
                    <Col md={6} lg={4} className="d-inline-flex p-2">
                      <Movie key={post.id} {...post} setPosts={setPosts} />
                    </Col>
                  ))}
                  dataLength={posts.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!posts.next}
                  next={() => fetchMoreData(posts, setPosts)}
                />
              </Container>
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
