import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import { Col, Row, Container, Form } from "react-bootstrap";
import Movie from "./Movie";
import styles from "../../styles/MovieList.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";

const Liked = ({ filter, message }) => {
  useRedirect("loggedOut");
  const [posts, setPosts] = useState({ results: [] });
  const { pathname } = useLocation();
  const [hasLoad, setHasLoad] = useState(false);
  const [query, setQuery] = useState("");
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setHasLoad(true);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    setHasLoad(false);
    fetchPosts();
  }, [pathname, query, filter, currentUser]);

  return (
    <>
      <Container>
        <Row>
          <Col sm={12} className="pt-5 text-center">
            <Form
              onSubmit={(event) => event.preventDefault()}
              className={`pt-5 ${styles.SearchBar}`}
            >
              <Form.Control
                type="text"
                className="mr-sm-2 text-center"
                placeholder="Search reviews by title, genre or author's username"
                onChange={(event) => setQuery(event.target.value)}
              />
            </Form>
          </Col>
          <Col className="text-center">
            {hasLoad ? (
              <>
                {posts.results.length ? (
                  <InfiniteScroll
                    children={posts.results.map((post) => (
                      <Col
                        key={post.id}
                        md={6}
                        xl={4}
                        className="d-inline-flex p-4"
                      >
                        <Movie key={post.id} {...post} setPosts={setPosts} />
                      </Col>
                    ))}
                    dataLength={posts.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!posts.next}
                    next={() => fetchMoreData(posts, setPosts)}
                  />
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
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Liked;
