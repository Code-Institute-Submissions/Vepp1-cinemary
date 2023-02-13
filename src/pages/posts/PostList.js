import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
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

                  <p>
                    <i className="fas fa-heart" />
                    <i className="fas fa-comment" />
                  </p>

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
