import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import styles from "../styles/Movie.module.css";
import { DropdownButton, InputGroup } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { useCurrentUser } from "../context/CurrentUserContext";

const Movie = (props) => {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/posts/${props.id}`);
      navigate(0);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: props.id });
      props.setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === props.id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${props.like_id}`);
      props.setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === props.id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <>
      <Card className={styles.Post} key={props.id}>
        <a href={`/posts/${props.id}`} className={styles.Anchor}>
          <figure>
            <Card.Img variant="top" src={props.image} alt={props.title} />
          </figure>
        </a>

        <Card.Body className={styles.Body}>
          <Card.Title className={`${styles.Title} d-inline-flex`}>
            {props.title}{" "}
            <span className="float-right pl-2">
              {currentUser?.username === props.owner ? (
                <InputGroup className="flex-row-reverse">
                  <DropdownButton
                    variant="outline-secondary"
                    id="input-group-dropdown-1"
                    title=""
                  >
                    <DropdownItem onClick={() => navigate(`/edit/${props.id}`)}>
                      Edit
                    </DropdownItem>
                    <DropdownItem onClick={() => handleDelete()}>
                      Delete
                    </DropdownItem>
                  </DropdownButton>
                </InputGroup>
              ) : null}
            </span>
          </Card.Title>
          <Card.Text className="mt-2">
            <div>
              <p><strong>Genre:</strong> {props.genre}</p> 
              <p><strong>Director:</strong> {props.director}</p> 
            </div>

            {currentUser ? (
              props.like_id ? (
                <span onClick={() => handleUnlike()}>
                  {props.likes_count}
                  <i className={`fas fa-heart ${styles.Liked}`} />
                </span>
              ) : (
                <span onClick={() => handleLike()}>
                  {props.likes_count}
                  <i className={`fa-regular fa-heart ${styles.NotLiked}`} />
                </span>
              )
            ) : (
              <span>
                {props.likes_count}
                <i className={`fas fa-heart ${styles.LoggedOut}`} />
              </span>
            )}

            {props.comments_count}
            <span>
              <a href={`/posts/${props.id}`}>
                <i className={`fa-regular fa-comment ${styles.Comments}`} />
              </a>
            </span>
            <br />

            <span className={styles.Owner}>
              <em>Created by:</em> <strong>{props.owner}</strong> -{" "}
              {props.created_at}{" "}
            </span>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Movie;
