import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/PostList.module.css";
import Asset from "../../components/Asset";
import { Container, DropdownButton, InputGroup } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { useCurrentUser } from "../../context/CurrentUserContext";

const PostList = () => {
  const [posts, setPosts] = useState({ results: [] });
  const { pathname } = useLocation();
  const [hasLoad, setHasLoad] = useState(false);
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  const handleDelete = async (key) => {
    try {
      await axiosReq.delete(`/posts/${key}`);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (key) => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: key });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.key === key
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.key }
            : post;
        }),
      }));
    } catch (error) {
      console.log(key);
    }
  };

  const handleUnlike = async (key) => {
    try {
      await axiosRes.delete(`/likes/${key}`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.key === key
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (error) {
      console.log(error);
    }
  };

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
      {hasLoad ? (
        <>
          {posts.results?.map((post) => (
            <Card className={styles.Post} key={post.id}>
              <a href="/" className={styles.Anchor}>
                <figure>
                  <Card.Img variant="top" src={post.image} alt="Post Image" />
                </figure>
              </a>

              <Card.Body>
                {currentUser?.username === post.owner ? (
                  <InputGroup className="flex-row-reverse">
                    <DropdownButton
                      variant="outline-secondary"
                      id="input-group-dropdown-1"
                      className="flex-row-reverse"
                      title=""
                    >
                      <DropdownItem
                        onClick={() => navigate(`/edit/${post.id}`)}
                      >
                        Edit
                      </DropdownItem>
                      <DropdownItem onClick={() => handleDelete(post.id)}>
                        Delete
                      </DropdownItem>
                    </DropdownButton>
                  </InputGroup>
                ) : null}

                <Card.Title className={styles.Title}>{post.title} </Card.Title>
                <Card.Text className="mt-2">
                  <p>
                    <strong>Genrer:</strong> {post.genrer}
                  </p>

                  {currentUser ? (
                    post.like_id ? (
                      <span onClick={() => handleUnlike(post.like_id)}>
                        {post.likes_count}
                        <i className={`fas fa-heart ${styles.Liked}`} />
                      </span>
                    ) : (
                      <span onClick={() => handleLike(post.id)}>
                        {post.likes_count}
                        <i
                          className={`fa-regular fa-heart ${styles.NotLiked}`}
                        />
                      </span>
                    )
                  ) : (
                    <span>
                      {post.likes_count}
                      <i className={`fas fa-heart ${styles.LoggedOut}`} />
                    </span>
                  )}

                  <i className="fas fa-comment" />

                  <div className={styles.Align}>
                    <div className={styles.Owner}>
                      <p>
                        <em>Created by:</em> <strong>{post.owner}</strong> -{" "}
                        {post.created_at}{" "}
                      </p>
                    </div>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </>
      ) : (
        <Container>
          <Asset spinner />
        </Container>
      )}
    </>
  );
};

export default PostList;
